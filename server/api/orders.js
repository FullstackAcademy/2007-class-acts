const express = require('express')
const router = express.Router()
const { Order, OrderItem, User } = require('../db')

router.get('/', async (req, res, next) => {
  try {
    if(req.user.isAdmin) {
      const orders = await Order.findAll({ include: [OrderItem, User], order: ['date']})
      res.send(orders)
    } else {
      res.sendStatus(401)
    }
  } catch(err) {
    console.log(err)
    res.sendStatus(500)
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    if(req.user.isAdmin) {
      const order = await Order.findByPk(req.params.id, { include: [OrderItem, User], order: ['date']})
      await order.update(req.body)
      res.send(order)
    } else {
      res.sendStatus(401)
    }
  } catch(err) {
    console.log(err)
    res.sendStatus(500)
    next(err)
  }
})

module.exports = router
