const express = require('express')
const router = express.Router()
const { Artwork, Artist } = require('../db')

router.get('/', async (req, res, next) => {
  const artworks = await Artwork.findAll({include: [Artist]})
  res.send(artworks)
})

router.get('/:artworkId', async (req, res, next) => {
  const artwork = await Artwork.findByPk(req.params.artworkId, {include: [Artist]})
  res.send(artwork)
})

router.put('/:artworkId', async (req, res, next) => {
  const artwork = await Artwork.findByPk(req.params.artworkId)
  await artwork.update(req.body)
  res.send(artwork)
})

module.exports = router
