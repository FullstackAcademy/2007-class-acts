const express = require('express')
const router = express.Router()
const { Cart, CartItem } = require('../db')


//this route is for adding a single item to the cart at a time
router.post('/item', async (req, res, next) => {
  try {
    //only accept if authenticated user
    if (req.user) {
      const { artworkId, quantity } = req.body
      //get or create the user's cart
      const [cart, _] = await Cart.findOrCreate( {
        where: {
          userId: req.user.id
        }
      })
      //get or create the single item being posted (default qty 0)
      const [cartItem, created] = await CartItem.findOrCreate({
        where: {
          artworkId: artworkId,
          cartId: cart.id
        }
      })
      //update the quantity of the item to match the qty posted
      //this is done so that the user can add more of an existing item to the cart
      //and there won't be multiple entries for the same artwork
      await cartItem.update({ quantity: cartItem.quantity + quantity})
      res.status(201).send(cartItem)
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    next(e)
  }
})

//this route is for adding many items at once (as in when sending a
//complete cart from localStorage after user logs in)
router.post('/items', async (req, res, next) => {
  try {
    if (req.user) {
      //an array of artworks + quantities
      const cartItems = req.body
      //find the user's cart
      const [cart, _] = await Cart.findOrCreate( {
        where: {
          userId: req.user.id
        }
      })
      //new cart items for sending back and handling in redux
      const newCartItems = []
      //probably some better way to do this with Promise.all, but again
      //this uses the find/create-then-update scheme, so this just seemed
      //simpler than trying to deepen my understanding of Promises
      cartItems.forEach(async (item) => {
        const { artworkId, quantity } = item
        //make each cartItem in DB, default qty 0
        const [cartItem, _] = await CartItem.findOrCreate({
          where: {
            artworkId: artworkId,
            cartId: cart.id
          }
        })
        //give it the right qty
        await cartItem.update({ quantity: cartItem.quantity + quantity})
        //add it to the items to send back to handle in redux
        newCartItems.push(cartItem)
        //only send response once all updates are done
        if(newCartItems.length === cartItems.length) res.status(201).send(newCartItems)
      })
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    next(e)
  }
})

module.exports = router
