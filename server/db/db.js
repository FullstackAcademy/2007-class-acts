const Sequelize = require('sequelize')

const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/graceshopper',
  { logging: false }
)

module.exports = db
