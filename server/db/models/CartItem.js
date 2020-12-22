const { UUID, UUIDV4, INTEGER } = require('sequelize')
const db = require('../db')

const CartItem = db.define('cartItem', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  quantity: {
    type: INTEGER,
    defaultValue: 0,
  },
})

module.exports = CartItem
