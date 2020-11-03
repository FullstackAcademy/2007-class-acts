const { DOUBLE, UUID, UUIDV4, INTEGER } = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  orderedPrice: DOUBLE,
  orderedQuantity: INTEGER,
})

module.exports = OrderItem
