const { artProperties } = require('./constants')

const validateArt = (obj) => {
  const art = {}
  Object.entries(obj).forEach(([key, value]) => {
    if (artProperties.includes(key)) {
      art[key] = value
    }
  })
  return art
}

module.exports = {
  validateArt,
}
