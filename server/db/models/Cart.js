const { UUID, UUIDV4 } = require("sequelize")
const db = require('../db')

const Cart = db.define('cart', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  }
})

module.exports = Cart
