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

module.exports = router
