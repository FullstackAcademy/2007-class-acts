const express = require('express')
const router = express.Router()
const stripe = require('stripe')('sk_test_51HjGjMLMMiRvpdjjl2kT4rA4xOQbDmjGNyRtTFpqSpFNwEf2u417KKyjgC0vVhvmS8JP6uYmJFtR0mSlumgBpKUZ00tarU8ly2')
const { Cart, CartItem } = require('../db')

router.post('/session', async (req, res, next) => {
  let client_ref_id = null
  let client_email = null
  //let cart = {}

  /* if (req.user) {
    const user = await User.findByPk(req.user.id, {include: [Cart]})
    client_ref_id = req.user.id
    client_email = req.user.email
    console.log(user)
  } */
  //console.log(cart)
  //if the user isnt logged in get the cart from local storage
  const session = await stripe.checkout.sessions.create({
    success_url: 'http://localhost:3000/orderconfirmation',
    cancel_url: 'http://localhost:3000/orderconfirmation',
    payment_method_types: ['card'],
    line_items: [
      //test data, have to figure out how to transform db to fit this expected structure LOL
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    //client_reference_id: client_ref_id,
    //customer_email: client_email,
    mode: 'payment',
  })
  res.json({ id: session.id })
})

module.exports = router
