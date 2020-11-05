const { STRING, UUID, UUIDV4, BOOLEAN } = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: STRING,
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false,
  },
})

module.exports = User
