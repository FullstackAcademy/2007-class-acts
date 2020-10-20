const express = require('express')
const router = express.Router()
const { Genre } = require('../db')

router.get('/', async (req, res, next) => {
  const genres = await Genre.findAll()
  res.send(genres)
})

router.get('/:genreId', async (req, res, next) => {
  const genre = await Genre.findByPk(req.params.genreId)
  res.send(genre)
})

module.exports = router
