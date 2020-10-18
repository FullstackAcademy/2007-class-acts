const { mediums } = require('../../constants')
const { STRING, TEXT, INTEGER, ENUM, DOUBLE, UUID, UUIDV4 } = require("sequelize")
const db = require('../db')

const Artwork = db.define('artwork', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  title: STRING,
  description: TEXT,
  year: INTEGER,
  medium: ENUM(mediums),
  price: DOUBLE,
  quantity: INTEGER
})

module.exports = Artwork
