import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../animations/pageTransitions';

const AdminDashboard = () => {
  return (
    <motion.div className="admin-dashboard" initial="hidden" animate="visible" variants={fadeIn}>
      <h1>Admin Dashboard</h1>
      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-value">0</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-value">₹0</p>
        </div>
        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-value">0</p>
        </div>
        <div className="stat-card">
          <h3>Pending Returns</h3>
          <p className="stat-value">0</p>
        </div>
      </div>
      <div className="admin-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="btn-primary">Manage Products</button>
          <button className="btn-primary">Manage Orders</button>
          <button className="btn-primary">Manage Returns</button>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
