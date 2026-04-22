const { Return, Order } = require('../models');

// Create return request
exports.createReturn = async (req, res, next) => {
  try {
    const { order_id, reason, image_url } = req.body;
    const user_id = req.user.id;

    // Verify order belongs to user
    const order = await Order.findOne({
      where: { id: order_id, user_id }
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found or does not belong to you'
      });
    }

    // Create return request
    const returnRequest = await Return.create({
      order_id,
      reason,
      image_url
    });

    res.status(201).json({
      success: true,
      message: 'Return request submitted successfully',
      data: returnRequest
    });
  } catch (error) {
    next(error);
  }
};

// Get user's returns
exports.getUserReturns = async (req, res, next) => {
  try {
    const user_id = req.user.id;

    const returns = await Return.findAll({
      include: [{
        model: Order,
        where: { user_id }
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: returns
    });
  } catch (error) {
    next(error);
  }
};

// Get single return
exports.getReturnById = async (req, res, next) => {
  try {
    const returnRequest = await Return.findOne({
      where: { id: req.params.id },
      include: [{
        model: Order,
        where: { user_id: req.user.id }
      }]
    });

    if (!returnRequest) {
      return res.status(404).json({
        success: false,
        message: 'Return request not found'
      });
    }

    res.json({
      success: true,
      data: returnRequest
    });
  } catch (error) {
    next(error);
  }
};

// Update return status (Admin)
exports.updateReturnStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const returnRequest = await Return.findByPk(req.params.id);

    if (!returnRequest) {
      return res.status(404).json({
        success: false,
        message: 'Return request not found'
      });
    }

    returnRequest.status = status;
    await returnRequest.save();

    res.json({
      success: true,
      message: 'Return status updated',
      data: returnRequest
    });
  } catch (error) {
    next(error);
  }
};

// Get all returns (Admin)
exports.getAllReturns = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const where = {};

    if (status) {
      where.status = status;
    }

    const offset = (page - 1) * limit;

    const { count, rows: returns } = await Return.findAndCountAll({
      where,
      include: [Order],
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        returns,
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
