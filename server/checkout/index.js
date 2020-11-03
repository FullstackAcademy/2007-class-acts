// LIBRARIES
const express = require('express');
const router = express.Router();

// might want to hide this key in .env file
const stripe = require('stripe')('sk_test_51HjGjMLMMiRvpdjjl2kT4rA4xOQbDmjGNyRtTFpqSpFNwEf2u417KKyjgC0vVhvmS8JP6uYmJFtR0mSlumgBpKUZ00tarU8ly2');

// FILES
const { User, Cart, CartItem, Artwork } = require('../db');
const { DOMAIN } = require('../constants');

// POST /api/checkout/session
router.post('/session', async (req, res, next) => {
  let client_ref_id = null;
  let client_email = null;
  let cart = [];

  // if the user is logged in...
  if (req.user) {
    const user = await User.findByPk(req.user.id, { 
      include: [{
        model: Cart, 
        include: [{
          model: CartItem,
          include: [Artwork]
        }] 
      }] 
    });

    client_ref_id = req.user.id;
    client_email = req.user.email;

    user.cart.cartItems.forEach(cartItem => {
      cart.push({ 
        price_data: {
          currency: 'usd',
          product_data: {
            name: cartItem.artwork.title
          },
          unit_amount: Math.round(cartItem.artwork.price * 100)
        },
        quantity: cartItem.quantity 
      });
    });
  } 
  // if user isn't logged in, grab the cart from the local storage

  // HELP!!! This is going out of order. Session created before data pushed to cart.
  else {
    req.body.localCart.forEach( async(cartItem) => {
      const artwork = await Artwork.findByPk(cartItem.artworkId);
      console.log('about to push');

      cart.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: artwork.title
          },
          unit_amount: Math.round(artwork.price * 100)
        }, 
        quantity: cartItem.quantity
      });
    });
    console.log('out of the loop');
  }
  
  const session = req.user ? 
    await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cart,
      client_reference_id: client_ref_id,
      customer_email: client_email,
      mode: 'payment',
      success_url: `${DOMAIN}/orderconfirmation`,
      cancel_url: `${DOMAIN}/orderconfirmation`
    }) :
    await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cart,
      mode: 'payment',
      success_url: `${DOMAIN}/orderconfirmation`,
      cancel_url: `${DOMAIN}/orderconfirmation`
    });

  res.json({ id: session.id })
})

// Not hitting this route
// https://stripe.com/docs/payments/checkout/fulfill-orders
router.post('/webhook', (req, res, next) => {
  const payload = req.body;
  console.log("Got payload: ", payload);
  // handleOrder();
  // sendConfirmationEmail();
  res.status(200)
})

// TODO
function handleOrder() {
  // Create express routes for each step...
  // for each artwork in order, adjust quantity of artwork in db
  // add Order, OrderItem to db
  // If auth user, associate Order and User in db
  // Clear cart - how to do this from the backend?? Do in front end after this route?
}

// TODO
function sendConfirmationEmail() {

}

module.exports = router;
