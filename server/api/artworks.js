const express = require('express')
const router = express.Router()
const { Artwork, Artist, ShopImage, Genre } = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const artworks = await Artwork.findAll({include: [Artist, ShopImage, Genre]})
    res.send(artworks)
  }
  catch(err) {
    next(err);
  }
})

router.get('/:artworkId', async (req, res, next) => {
  try {
    const artwork = await Artwork.findByPk(req.params.artworkId, {include: [Artist]})
    res.send(artwork)
  }
  catch(err) {
    next(err);
  }
})

router.put('/:artworkId', async (req, res, next) => {
  try {
    const artwork = await Artwork.findByPk(req.params.artworkId)
    await artwork.update(req.body)
    res.send(artwork)
  }
  catch(err) {
    next(err);
  }
})

module.exports = router
