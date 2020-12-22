const express = require('express')
const router = express.Router()

router.use('/artists', require('./artists'))
router.use('/artworks', require('./artworks'))
router.use('/genres', require('./genres'))
router.use('/users', require('./users'))
router.use('/cart', require('./cart'))
router.use('/reviews', require('./reviews'))
router.use('/orders', require('./orders'))

router.use('/checkout', require('../checkout/index'))

module.exports = router
