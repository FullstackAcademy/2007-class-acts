const express = require('express')
const router = express.Router()
const { Genre, Artwork } = require('../db')

// GET /api/genres/
router.get('/', async (req, res, next) => {
  try {
    // TODO: shouldn't have to include Artwork
    const genres = await Genre.findAll({
      include: [Artwork],
      order: ['name']
    });
    res.send(genres);
  }
  catch(err) {
    next(err);
  }
})

// GET /api/genres/:genreId
router.get('/:genreId', async (req, res, next) => {
  try {
    const genre = await Genre.findByPk(req.params.genreId, {
      include: [Artwork]
    })
    res.send(genre)
  }
  catch(err) {
    next(err);
  }
})

module.exports = router
