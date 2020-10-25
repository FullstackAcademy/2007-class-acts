const express = require('express')
const router = express.Router()
const { Cart, CartItem } = require('../db')

router.post('/item/', async (req, res, next) => {
  try {
    //if they're not logged in, don't do anything to the db, just say OK
    if(!req.user) res.sendStatus(200)
    //but if they are,
    else {
      const cart = (await Cart.findOrCreate({
        where: { userId: req.user.id }
      }))[0]
      const { artworkId, quantity } = req.body
      await CartItem.create({
        artworkId,
        quantity,
        cartId: cart.id
      })
      res.sendStatus(201)
    }
  }
  catch(err) {
    console.log(err)
    next(err);
  }
})

module.exports = router
