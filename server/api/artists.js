const express = require('express')
const router = express.Router()
const { Artist, Artwork } = require('../db')

router.get('/', async (req, res, next) => {
  const artists = await Artist.findAll()
  res.send(artists)
})

router.get('/:artistId', async (req, res, next) => {
  const artist = await Artist.findByPk(req.params.artistId, {include: [Artwork]})
  res.send(artist)
})

router.put('/:artistId', async (req, res, next) => {
  const artist = await Artist.findByPk(req.params.artistId)
  await artist.update(req.body)
  res.send(artist)
})

module.exports = router
