const { TEXT, INTEGER, UUID, UUIDV4 } = require("sequelize")
const { minRating, maxRating, minReviewLength, maxReviewLength } = require('../../constants')
const db = require('../db')

const Review = db.define('review', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  rating: {
    type: INTEGER,
    validate: {
      min: minRating,
      max: maxRating
    }
  },
  text: {
    type: TEXT,
    validate: {
      len: [minReviewLength, maxReviewLength]
    }
  }
})

module.exports = Review
