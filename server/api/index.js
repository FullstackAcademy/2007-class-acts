const express = require('express')
const router = express.Router()

router.use('/artists', require('./artists'))
router.use('/artworks', require('./artworks'))
router.use('/genres', require('./genres'))
router.use('/users', require('./users'))

module.exports = router
