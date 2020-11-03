const { STRING, INTEGER, UUID, UUIDV4 } = require('sequelize')
const { defaultImagePath } = require('../../constants')
const db = require('../db')

const ShopImage = db.define('shopImage', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  imageURL: {
    type: STRING,
    defaultValue: defaultImagePath,
  },
  order: INTEGER,
})

module.exports = ShopImage
