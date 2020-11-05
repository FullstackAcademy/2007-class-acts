const validateData = (obj, arr) => {
  const data = {}
  Object.entries(obj).forEach(([key, value]) => {
    if (arr.includes(key)) {
      if (key && !value) {
        data[key] = null
      } else if (key === 'year') {
        data[key] = value * 1
      } else {
        data[key] = value
      }
    }
  })
  return data
}

const getCookieValue = (name) => {
  let result = document.cookie.match("(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)")
  return result ? result.pop() : ""
}

module.exports = {
  validateData,
  getCookieValue
}
