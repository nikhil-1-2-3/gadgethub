const { Order, OrderItem, Cart, Product, User, Return } = require('../models');
const { Op } = require('sequelize');

// Create order from cart
exports.createOrder = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const { address, payment_method, delivery_method = 'standard' } = req.body;

    // Get user's cart items
    const cartItems = await Cart.findAll({
      where: { user_id },
      include: [Product]
    });

    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Calculate total
    let total = 0;
    const orderItems = [];

    for (const item of cartItems) {
      const price = parseFloat(item.Product.price);
      total += price * item.quantity;
      orderItems.push({
        product_id: item.product_id,
        quantity: item.quantity,
        price: price
      });

      // Update product stock
      await Product.decrement('stock', {
        where: { id: item.product_id },
        by: item.quantity
      });
    }

    // Add shipping cost
    const shippingCost = delivery_method === 'express' ? 50 : 0;
    total += shippingCost;

    // Create order
    const order = await Order.create({
      user_id,
      total,
      payment_method,
      address,
      delivery_method
    });

    // Create order items
    for (const item of orderItems) {
      await OrderItem.create({
        order_id: order.id,
        ...item
      });
    }

    // Clear cart
    await Cart.destroy({ where: { user_id } });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// Get user's orders
exports.getUserOrders = async (req, res, next) => {
  try {
    const user_id = req.user.id;

    const orders = await Order.findAll({
      where: { user_id },
      include: [{
        model: OrderItem,
        include: [Product]
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

// Get single order
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id
      },
      include: [{
        model: OrderItem,
        include: [Product]
      }, Return]
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// Update order status (Admin)
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.status = status;
    await order.save();

    res.json({
      success: true,
      message: 'Order status updated',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// Get all orders (Admin)
exports.getAllOrders = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const where = {};

    if (status) {
      where.status = status;
    }

    const offset = (page - 1) * limit;

    const { count, rows: orders } = await Order.findAndCountAll({
      where,
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: OrderItem, include: [Product] }
      ],
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          total: count,
          page: parseInt(page),
          pages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
