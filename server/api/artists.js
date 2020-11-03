const express = require('express')
const router = express.Router()
const { Artist, Artwork } = require('../db')
const { validateData } = require('../utils')
const { artistProperties } = require('../constants')

// GET /api/artists/
router.get('/', async (req, res, next) => {
  try {
    const artists = await Artist.findAll({
      include: [Artwork],
      order: ['name'],
    })
    res.send(artists)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    try {
      const data = validateData(req.body, artistProperties)
      const artist = await Artist.create(data)
      res.status(201).send(artist)
    } catch (err) {
      next(err)
    }
  } else {
    res.sendStatus(401)
  }
})

// GET /api/artists/:artistId
router.get('/:artistId', async (req, res, next) => {
  try {
    const artist = await Artist.findByPk(req.params.artistId, {
      include: [Artwork],
    })
    res.send(artist)
  } catch (err) {
    next(err)
  }
})

// PUT /api/artists/:artistsId
router.put('/:artistId', async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    try {
      const data = validateData(req.body, artistProperties)
      const artist = await Artist.findByPk(req.params.artistId, {include: [Artwork]})
      await artist.update(data)
      res.send(artist)
    } catch (err) {
      next(err)
    }
  } else {
    res.sendStatus(401)
  }
})

module.exports = router
