const express = require('express')
const router = express.Router()
const { Order, OrderItem } = require('../db')

// GET /api/orders/stripeRefId
router.get('/stripeRefId/:id', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        stripeRefId: req.params.id
      },
      include: [OrderItem]
    });
    res.send(order);
  }
  catch(err) {
    next(err);
  }
})


module.exports = router
