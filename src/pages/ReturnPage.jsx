import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { fadeIn } from '../animations/pageTransitions';

const ReturnPage = () => {
  const [orders, setOrders] = useState([]);
  const [returns, setReturns] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [ordersRes, returnsRes] = await Promise.all([
        api.get('/orders'),
        api.get('/returns')
      ]);
      setOrders(ordersRes.data.data);
      setReturns(returnsRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/returns', {
        order_id: selectedOrder,
        reason
      });
      toast.success('Return request submitted');
      fetchData();
      setSelectedOrder('');
      setReason('');
    } catch (error) {
      toast.error('Failed to submit return request');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <motion.div className="return-page" initial="hidden" animate="visible" variants={fadeIn}>
      <h1>Returns & Refunds</h1>
      
      <div className="return-content">
        <div className="return-form-section">
          <h2>Request Return</h2>
          <form onSubmit={handleSubmit} className="return-form">
            <div className="form-group">
              <label>Select Order</label>
              <select value={selectedOrder} onChange={(e) => setSelectedOrder(e.target.value)} required>
                <option value="">Choose an order</option>
                {orders.map((order) => (
                  <option key={order.id} value={order.id}>
                    Order #{order.id} - ₹{order.total.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Reason</label>
              <select value={reason} onChange={(e) => setReason(e.target.value)} required>
                <option value="">Select reason</option>
                <option value="defective">Defective Product</option>
                <option value="wrong_item">Wrong Item Received</option>
                <option value="not_as_described">Not as Described</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button type="submit" className="btn-primary">Submit Return Request</button>
          </form>
        </div>

        <div className="returns-list-section">
          <h2>My Return Requests</h2>
          {returns.length === 0 ? (
            <p>No return requests</p>
          ) : (
            <div className="returns-list">
              {returns.map((ret) => (
                <div key={ret.id} className="return-item">
                  <h3>Order #{ret.order_id}</h3>
                  <p>Reason: {ret.reason}</p>
                  <span className={`status-badge ${ret.status}`}>{ret.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ReturnPage;
