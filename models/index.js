const User = require('./User');
const Product = require('./Product');
const Cart = require('./Cart');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Return = require('./Return');

// User associations
User.hasMany(Cart, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Order, { foreignKey: 'user_id', onDelete: 'CASCADE' });

// Product associations
Product.hasMany(Cart, { foreignKey: 'product_id', onDelete: 'CASCADE' });
Product.hasMany(OrderItem, { foreignKey: 'product_id', onDelete: 'CASCADE' });

// Cart associations
Cart.belongsTo(User, { foreignKey: 'user_id' });
Cart.belongsTo(Product, { foreignKey: 'product_id' });

// Order associations
Order.hasMany(OrderItem, { foreignKey: 'order_id', onDelete: 'CASCADE' });
Order.hasMany(Return, { foreignKey: 'order_id', onDelete: 'CASCADE' });

// OrderItem associations
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

// Return associations
Return.belongsTo(Order, { foreignKey: 'order_id' });

module.exports = {
  User,
  Product,
  Cart,
  Order,
  OrderItem,
  Return
};
