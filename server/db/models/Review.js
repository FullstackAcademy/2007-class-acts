const { TEXT, INTEGER, UUID, UUIDV4 } = require("sequelize")
const db = require('../db')

const Review = db.define('review', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  rating: INTEGER,
  text: TEXT
})

module.exports = Review
