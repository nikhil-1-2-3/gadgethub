const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('placed', 'packed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'),
    defaultValue: 'placed'
  },
  payment_method: {
    type: DataTypes.ENUM('upi', 'card', 'cod'),
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  delivery_method: {
    type: DataTypes.ENUM('standard', 'express'),
    defaultValue: 'standard'
  }
}, {
  timestamps: true
});

module.exports = Order;
