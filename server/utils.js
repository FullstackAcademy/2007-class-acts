const validateData = (obj, arr) => {
  const data = {}
  Object.entries(obj).forEach(([key, value]) => {
    if (arr.includes(key)) {
      data[key] = value
    }
  })
  return data
}

module.exports = {
  validateData,
}
