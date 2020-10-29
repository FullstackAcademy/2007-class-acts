const { STRING, UUID, UUIDV4 } = require("sequelize")
const db = require('../db')

const Genre = db.define('genre', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  name: STRING
})

module.exports = Genre
