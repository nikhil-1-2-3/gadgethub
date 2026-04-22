import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/axios';
import { fadeIn } from '../animations/pageTransitions';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await api.get(`/orders/${id}`);
      setOrder(response.data.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!order) return <div>Order not found</div>;

  const statusSteps = ['placed', 'packed', 'shipped', 'out_for_delivery', 'delivered'];
  const currentStep = statusSteps.indexOf(order.status);

  return (
    <motion.div className="order-details-page" initial="hidden" animate="visible" variants={fadeIn}>
      <h1>Order #{order.id}</h1>
      
      <div className="order-tracking">
        <h2>Order Tracking</h2>
        <div className="tracking-timeline">
          {statusSteps.map((step, index) => (
            <div key={step} className={`tracking-step ${index <= currentStep ? 'active' : ''}`}>
              <div className="step-marker">{index + 1}</div>
              <div className="step-label">{step.replace('_', ' ')}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="order-items">
        <h2>Order Items</h2>
        {order.OrderItems?.map((item) => (
          <div key={item.id} className="order-item">
            <img src={item.Product?.image} alt={item.Product?.title} />
            <div className="order-item-info">
              <h3>{item.Product?.title}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{item.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="order-summary">
        <h2>Order Summary</h2>
        <p>Total: ₹{order.total.toLocaleString()}</p>
        <p>Payment: {order.payment_method.toUpperCase()}</p>
        <p>Address: {order.address}</p>
      </div>
    </motion.div>
  );
};

export default OrderDetails;
