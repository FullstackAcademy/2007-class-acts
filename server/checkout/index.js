const express = require('express')
const router = express.Router()
const stripe = require('stripe')('sk_test_51HjGjMLMMiRvpdjjl2kT4rA4xOQbDmjGNyRtTFpqSpFNwEf2u417KKyjgC0vVhvmS8JP6uYmJFtR0mSlumgBpKUZ00tarU8ly2')

router.post('/session', async (req, res, next) => {
  let client_ref_id = null
  let client_email = null
  let cart = {}

  if (req.user) {
    client_ref_id = req.user.id
    client_email = req.user.email
  }
  //if the user isnt logged in get the cart from local storage
  const session = await stripe.checkout.session.create({
    success_url: 'http://localhost:3000/',
    cancel_url: 'http://localhost:3000/',
    payment_method_types: ['card'],
    client_reference_id: client_ref_id,
    customer_email: client_email,
    mode: 'payment'
  })
  res.json({ id: session.id })
})

module.exports = router
