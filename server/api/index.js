const express = require('express')
const router = express.Router()

router.use('/artists', require('./artists'))
router.use('/artworks', require('./artworks'))
router.use('/genres', require('./genres'))

module.exports = router
