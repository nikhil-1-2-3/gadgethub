const express = require('express');
const router = express.Router();
const returnController = require('../controllers/returnController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// User routes (protected)
router.post('/', authMiddleware, returnController.createReturn);
router.get('/', authMiddleware, returnController.getUserReturns);
router.get('/:id', authMiddleware, returnController.getReturnById);

// Admin routes (protected)
router.put('/:id/status', authMiddleware, adminMiddleware, returnController.updateReturnStatus);
router.get('/all', authMiddleware, adminMiddleware, returnController.getAllReturns);

module.exports = router;
