const express = require('express')
const router = express.Router()
const { Genre, Artist, Artwork } = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const genres = await Genre.findAll({include: [Artist, Artwork]})
    res.send(genres)
  } catch (err) {
    next(err)
  }
})

router.get('/:genreId', async (req, res, next) => {
  try {
    const genre = await Genre.findByPk(req.params.genreId, {include: [Artist, Artwork]})
    res.send(genre)
  } catch (err) {
    next(err)
  }
})

module.exports = router
