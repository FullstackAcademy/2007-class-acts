/* eslint-disable camelcase */
// LIBRARIES
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// might want to hide this key in .env file
const stripe = require('stripe')('sk_test_51HjGjMLMMiRvpdjjl2kT4rA4xOQbDmjGNyRtTFpqSpFNwEf2u417KKyjgC0vVhvmS8JP6uYmJFtR0mSlumgBpKUZ00tarU8ly2');
const endpointSecret = 'whsec_oOK87w36wnsRyQ5Sb9iuaYA0Cvz231hc';

// FILES
const { User, Cart, CartItem, Artwork, Order, OrderItem } = require('../db');
const { DOMAIN } = require('../constants');

// POST /checkout/session
router.post('/session', async (req, res, next) => {
  let client_ref_id = null;
  let client_email = null;
  let cart = [];
  //metadata allows you to pass info the stripe that isnt being used to process the payment
  //metadata is used here to pass artworkIds
  let metadata = {}

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
      metadata[cartItem.artwork.title] = cartItem.artwork.id
    });
  } else {
    // if user isn't logged in, grab the cart from the local storage (passed in the req object)
    const localCart = req.body.localCart;
    for (let i = 0; i < localCart.length; i++) {
      const artwork = await Artwork.findByPk(localCart[i].artworkId);
      cart.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: artwork.title
          },
          unit_amount: Math.round(artwork.price * 100)
        },
        quantity: localCart[i].quantity
      });
      metadata[artwork.title] = artwork.id
    }
  }
  // send stripe user info, including ID and email if logged in
  const session = req.user ?
    await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cart,
      client_reference_id: client_ref_id,
      customer_email: client_email,
      //billing_address_collection: required,
      //NOTE: COULDNT GET ADDRESS TO SHOW UP, MAYBE IT DOESNT COLLECT ADDRESS IS TEST MODE?
      shipping_address_collection: {
        allowed_countries: ['US']
      },
      mode: 'payment',
      success_url: `${DOMAIN}/orderconfirmation`,
      cancel_url: `${DOMAIN}/orderconfirmation`,
      metadata: metadata
    }) :
    await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cart,
      mode: 'payment',
      success_url: `${DOMAIN}/orderconfirmation`,
      cancel_url: `${DOMAIN}/orderconfirmation`,
      metadata: metadata
    });

  res.json({ id: session.id })
})

// https://stripe.com/docs/payments/checkout/fulfill-orders
router.post('/webhook', bodyParser.raw({type: 'application/json'}), (req, res, next) => {
  const payload = req.body;
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.log(err)
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log(session)
    res.status(200);
    // Fulfill the purchase...
    const handledOrder = handleOrder(session);
    // sendConfirmationEmail();
    res.send(handledOrder)
  }
})

function handleOrder(session) {
  //NOTE: I tried returning the orders to see if we could send them as a response from the webhook
  //but that didnt really work
  let orderInfo
  if (session.payment_status === 'paid') {
    // if a logged in user
    if (session.customer_email !== null) {
      //orderInfo =
        handleAuthUser(session);
    } else {
     // orderInfo =
        handleGuestUser(session);
    }
  }
  else {
    console.log('You didn\'t pay, petty art thief!!!'); // ADD MORE ROBUST ERROR HANDLING HERE
  }
  return orderInfo
}

async function handleAuthUser(session) {
  const userId = session.client_reference_id
  //get line items from Stripe
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
  //get object with artwork IDs from Stripe
  const artData = session.metadata

  const now = new Date();
  const order = await Order.create({
      date: now,
      status: 'Created',
      //associate user with order
      userId: userId
      // address: '1234 First St' -- HOW TO GET SHIPPING ADDRESS FROM STRIPE?
  });

  for (let i = 0; i < lineItems.data.length; i++) {
    //Use line items to generate orderItems in DB
    const orderItem = await OrderItem.create({
      orderedPrice: lineItems.data[i].amount_subtotal / 100,
      orderedQuantity: lineItems.data[i].quantity,
      // associate orderItems with the main order
      orderId: order.id,
      // Associate artwork with OrderItem
      artworkId: artData[lineItems.data[i].description]
    });

    // decrement quantity in stock
    const artwork = await Artwork.findByPk(orderItem.artworkId)
    await artwork.update({ quantity: artwork.quantity - lineItems.data[i].quantity });
  }

  // clear the cart
  const userCart = await Cart.findOne({ where: { userId } });
  await CartItem.destroy({
    where: { cartId: userCart.id }
  });
  await userCart.destroy();
  //return order
}

async function handleGuestUser(session) {
  // Get line items from Stripe req object
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
  const artData = session.metadata

  // create order
  const now = new Date();
  const order = await Order.create({
      date: now,
      status: 'Created',
      // address: '1234 First St' -- HOW TO GET SHIPPING ADDRESS FROM STRIPE?
  });

  for (let i = 0; i < lineItems.data.length; i++) {
    // Put items in the cart into the OrderItem table
    const orderItem = await OrderItem.create({
      orderedPrice: lineItems.data[i].amount_subtotal / 100, // CONFIRM THAT THIS IS THE CORRECT $$
      orderedQuantity: lineItems.data[i].quantity,
      //data description is the title, which is the key for the artworkId in the artdata object
      artworkId: artData[lineItems.data[i].description],
      orderId: order.id
    });

    // decrement quantity in stock
    const artwork = await Artwork.findByPk(orderItem.artworkId)
    await artwork.update({ quantity: artwork.quantity-=lineItems.data[i].quantity})
  }
  //return order
  // TODO: CLEAR THE LOCAL CART IN THE ORDER CONFIRMATION COMPONENT AT COMPONENT DID MOUNT

}

// TODO
function sendConfirmationEmail() {

}

module.exports = router;
