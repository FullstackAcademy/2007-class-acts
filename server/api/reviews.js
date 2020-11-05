const express = require('express')
const router = express.Router()
const { Review, User, Order, OrderItem } = require('../db')

// GET /api/reviews/:artworkId
router.get('/:artworkId', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where : {
        artworkId: req.params.artworkId
      }
    })
    res.send(reviews)
  }
  catch(err) {
    console.log(err)
    next(err);
  }
})

// GET /api/reviews/user/:userId
router.get('/user/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: [Review]
    })
    res.send(user.reviews)
  }
  catch(err) {
    console.log(err)
    next(err);
  }
})

router.post('/', async (req, res, next) => {
  try {
    //make sure user is logged in
    if (req.user) {
      const userId = req.user.id
      const { artwork, rating, text } = req.body
      //find the user and include their orders and orderItems
      const user = await User.findByPk(userId, {
        include: {
          model: Order,
          include: [OrderItem]
        }
      })
      //list of artIds they've ordered
      const userOrderedArtIds = user.orders.reduce((acc,order)=>{
        const artworks = order.orderItems.map(oi=>oi.artworkId)
        acc.push(artworks)
        return acc
      },[]).flat()
      //if they've ordered the art they're reviewing then...
      if(userOrderedArtIds.includes(artwork.id)) {
        const [newReview, created] = await Review.findOrCreate({
          where: {
            artworkId: artwork.id,
            userId: req.user.id
          }
        })
        //if this review was created, update the text and rating
        if(created) {
          await newReview.update({ rating, text})
          res.status(201).send(newReview)
        } else {
          //if this review already existed, send back 401 unauth bc they've already reviewed this art
          res.sendStatus(401)
        }
      } else {
        //if logged in but haven't ordered this art before, send 401 unauth
        res.sendStatus(401)
      }
    } else {
      //if not logged in, send 401 unauth
      res.sendStatus(401);
    }
  }
  catch(err) {
    console.log(err)
    next(err);
  }
})

module.exports = router
