const { mediums } = require('../../constants')
const { STRING, TEXT, INTEGER, ENUM, DOUBLE, UUID, UUIDV4 } = require("sequelize")
const db = require('../db')

const Artwork = db.define('artwork', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  title: {
    type: STRING,
    allowNull: false
  },
  description: {
    type: TEXT,
    allowNull: false
  },
  year: INTEGER,
  medium: ENUM(mediums),
  price: {
    type: DOUBLE,
    allowNull: false
  },
  quantity: {
    type: INTEGER,
    allowNull: false
  }
})

module.exports = Artwork
