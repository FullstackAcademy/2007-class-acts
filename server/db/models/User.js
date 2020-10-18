const { STRING,  UUID, UUIDV4, BOOLEAN } = require("sequelize")
const db = require('../db')

const User = db.define('user', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  email: STRING,
  password: STRING,
  isAdmin: BOOLEAN
})

module.exports = User
