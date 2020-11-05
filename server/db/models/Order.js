const { orderStatuses } = require('../../constants')
const { STRING, ENUM, UUID, UUIDV4, DATE } = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  date: DATE,
  status: ENUM(orderStatuses),
  address: STRING,
  stripeRefId: STRING
})

module.exports = Order
