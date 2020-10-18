const { STRING, INTEGER, UUID, UUIDV4, } = require("sequelize")
const db = require('../db')

const ShopImage = db.define('shopImage', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  imageURL: STRING,
  order: INTEGER
})

module.exports = ShopImage
