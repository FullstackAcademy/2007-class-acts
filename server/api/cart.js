const express = require('express')
const router = express.Router()
const { Cart, CartItem } = require('../db')

router.post('/item', async (req, res) => {
  if (req.user) {
    const { artworkId, quantity } = req.body
    const [cart, _] = await Cart.findOrCreate( {
      where: {
        userId: req.user.id
      }
    })
    const [cartItem, created] = await CartItem.findOrCreate({
      where: {
        artworkId: artworkId,
        cartId: cart.id
      }
    })
    await cartItem.update({ quantity: cartItem.quantity + quantity})
    res.status(201).send(cartItem)
  } else {
    res.sendStatus(401);
  }
})

router.post('/items', async (req, res) => {
  if (req.user) {
    const cartItems = req.body
    const [cart, _] = await Cart.findOrCreate( {
      where: {
        userId: req.user.id
      }
    })

    const newCartItems = []
    cartItems.forEach(async (item) => {
      const { artworkId, quantity } = item
      const [cartItem, created] = await CartItem.findOrCreate({
        where: {
          artworkId: artworkId,
          cartId: cart.id
        }
      })
      await cartItem.update({ quantity: cartItem.quantity + quantity})
      newCartItems.push(cartItem)
      //only send response once all updates are done
      if(newCartItems.length === cartItems.length) res.status(201).send(newCartItems)
    })
  } else {
    res.sendStatus(401);
  }
})

module.exports = router
