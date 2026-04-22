import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/axios';
import { fadeIn } from '../animations/pageTransitions';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading orders...</div>;

  return (
    <motion.div className="orders-page" initial="hidden" animate="visible" variants={fadeIn}>
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <div className="empty-state">
          <h2>No orders yet</h2>
          <Link to="/" className="btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>Order #{order.id}</h3>
                <span className={`status-badge ${order.status}`}>{order.status.replace('_', ' ')}</span>
              </div>
              <div className="order-details">
                <p>Total: ₹{order.total.toLocaleString()}</p>
                <p>Payment: {order.payment_method.toUpperCase()}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <Link to={`/orders/${order.id}`} className="btn-primary">View Details</Link>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default OrdersPage;
