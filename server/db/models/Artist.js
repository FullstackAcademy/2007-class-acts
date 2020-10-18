const { STRING, TEXT, UUID, UUIDV4 } = require("sequelize")
const db = require('../db')

const Artist = db.define('artist', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  name: STRING,
  bio: TEXT,
  nationality: STRING
})

module.exports = Artist
