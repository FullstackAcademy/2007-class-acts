const express = require('express')
const router = express.Router()
const { Artist, Artwork, Genre, ShopImage } = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const artists = await Artist.findAll({include: [Artwork]})
    res.send(artists)
  } catch (err) {
    next(err)
  }
})

router.get('/:artistId', async (req, res, next) => {
  try {
    const artist = await Artist.findByPk(req.params.artistId, {include: [Artwork, Genre, ShopImage]})
    res.send(artist)
  } catch (err) {
    next(err)
  }
})

//put and post routes need some validation so only authenticated admin users can use
router.put('/:artistId', async (req, res, next) => {
  try {
    const artist = await Artist.findByPk(req.params.artistId)
    await artist.update(req.body)
    res.send(artist)
  } catch (err) {
    next(err)
  }
})

module.exports = router
