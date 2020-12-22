const express = require('express')
const router = express.Router()
const { Artwork, Artist, ShopImage, Genre } = require('../db')
const { validateData } = require('../utils')
const { artProperties } = require('../constants')

// GET /api/artworks
router.get('/', async (req, res, next) => {
  try {
    const artworks = await Artwork.findAll({
      include: [Artist, ShopImage, Genre],
    })
    res.send(artworks)
  } catch (err) {
    next(err)
  }
})

// POST /api/artworks
// check if user is admin user prior to using route
router.post('/', async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    try {
      const art = validateData(req.body, artProperties)

      //temp fix for new art having no genre
      //artwork needs an array of genres for some frontend mapping
      art.genres=[]

      const newArt = await Artwork.create(art, { include: [Artist, Genre] })
      if (req.body.artistId) {
        const artist = await Artist.findByPk(req.body.artistId)
        await newArt.setArtist(artist)
      }
      res.status(201).send(newArt)
    } catch (err) {
      next(err)
    }
  } else {
    res.sendStatus(401)
  }
})

// GET /api/artworks/:artworkId
router.get('/:artworkId', async (req, res, next) => {
  try {
    const artwork = await Artwork.findByPk(req.params.artworkId, {
      include: [Artist, ShopImage],
    })
    res.send(artwork)
  } catch (err) {
    next(err)
  }
})

// PUT /api/artworks/:artworkId
// check if user is admin before using this route to change price, etc.
router.put('/:artworkId', async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    try {
      const art = validateData(req.body, artProperties)
      const artwork = await Artwork.findByPk(req.params.artworkId, {
        include: [ShopImage, Artist, Genre],
      })
      await artwork.update(art, {include: [Artist]})
      res.send(artwork)
    } catch (err) {
      console.log(err)
      next(err)
    }
  } else {
    res.sendStatus(401)
  }
})

// DELETE /api/artworks/:artworkId
// check if user is admin before using this route
router.delete(':/artworkId', async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    try {
      const artToDelete = await Artwork.findByPk(req.params.artworkId)
      await artToDelete.destroy()
      res.sendStatus(204)
    } catch (err) {
      next(err)
    }
  } else {
    res.sendStatus(401)
  }
})

router.delete('/images/:imgId', async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    try {
      const imgToDelete = await ShopImage.findByPk(req.params.imgId)
      await imgToDelete.destroy()
      res.sendStatus(204)
    } catch (err) {
      next(err)
    }
  } else {
    res.sendStatus(401)
  }
})

router.post('/images/:artworkId', async (req, res, next) => {
  if (req.user && req.user.isAdmin && req.files) {
    console.log(req.files)
    let img = req.files.image
    const newImg = await ShopImage.create({
      artworkId: req.params.artworkId
    })
    const nm = req.files.image.name
    const ext = nm.slice(nm.lastIndexOf('.'))
    await newImg.update({imageURL: `/img/${newImg.id}${ext}`})
    img.mv(`./server/public/img/${newImg.id}${ext}`);
    res.sendStatus(200)
  } else {
    res.sendStatus(401)
  }
})

module.exports = router
