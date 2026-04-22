const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// User routes (protected)
router.post('/', authMiddleware, orderController.createOrder);
router.get('/', authMiddleware, orderController.getUserOrders);
router.get('/:id', authMiddleware, orderController.getOrderById);

// Admin routes (protected)
router.put('/:id/status', authMiddleware, adminMiddleware, orderController.updateOrderStatus);
router.get('/all', authMiddleware, adminMiddleware, orderController.getAllOrders);

module.exports = router;
