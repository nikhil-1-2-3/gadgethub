import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { fadeIn } from '../animations/pageTransitions';

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    payment_method: 'cod',
    delivery_method: 'standard'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const address = `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`;
      await api.post('/orders', {
        address,
        payment_method: formData.payment_method,
        delivery_method: formData.delivery_method
      });

      clearCart();
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      toast.error('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const shippingCost = formData.delivery_method === 'express' ? 50 : 0;
  const total = cartTotal + shippingCost;

  return (
    <motion.div className="checkout-page" initial="hidden" animate="visible" variants={fadeIn}>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit} className="checkout-content">
        <div className="checkout-form">
          <h2>Shipping Address</h2>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>State</label>
              <input type="text" name="state" value={formData.state} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Pincode</label>
              <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
          </div>

          <h2>Delivery Method</h2>
          <div className="delivery-options">
            <label className="radio-option">
              <input
                type="radio"
                name="delivery_method"
                value="standard"
                checked={formData.delivery_method === 'standard'}
                onChange={handleChange}
              />
              <span>Standard (Free)</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="delivery_method"
                value="express"
                checked={formData.delivery_method === 'express'}
                onChange={handleChange}
              />
              <span>Express (₹50)</span>
            </label>
          </div>

          <h2>Payment Method</h2>
          <div className="payment-options">
            <label className="radio-option">
              <input type="radio" name="payment_method" value="cod" checked={formData.payment_method === 'cod'} onChange={handleChange} />
              <span>Cash on Delivery</span>
            </label>
            <label className="radio-option">
              <input type="radio" name="payment_method" value="upi" checked={formData.payment_method === 'upi'} onChange={handleChange} />
              <span>UPI</span>
            </label>
            <label className="radio-option">
              <input type="radio" name="payment_method" value="card" checked={formData.payment_method === 'card'} onChange={handleChange} />
              <span>Credit/Debit Card</span>
            </label>
          </div>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="summary-item">
              <span>{item.title} x {item.quantity}</span>
              <span>₹{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{cartTotal.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>₹{shippingCost}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
          <button type="submit" className="btn-primary place-order-btn" disabled={loading}>
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CheckoutPage;
