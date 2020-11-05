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
  // if user isn't logged in, grab the cart from the local storage (passed in the req object)
  else {
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
    }
  }
  
  // send stripe user info, including ID and email if logged in
  const session = req.user ? 
    await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cart,
      client_reference_id: client_ref_id,
      customer_email: client_email,
      // shipping_address_collection: true,
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

    // Fulfill the purchase...
    handleOrder(session);
    // sendConfirmationEmail();
  }

  res.status(200);
})

function handleOrder(session) {
  if (session.payment_status === 'paid') {
    // if a logged in user
    if (session.customer_email !== null) {
      handleAuthUser(session.client_reference_id);
    } else {
      handleGuestUser(session);
    }
  }
  else {
    console.log('You didn\'t pay, petty art thief!!!'); // ADD MORE ROBUST ERROR HANDLING HERE
  }
}

async function handleAuthUser(userId) {
  const user = await User.findByPk(userId, { 
    include: [{
      model: Cart, 
      include: [{
        model: CartItem,
        include: [Artwork]
      }] 
    }] 
  }); 
  const now = new Date();
  const order = await Order.create({
      date: now,
      status: 'Created',
      // address: '1234 First St' -- HOW TO GET SHIPPING ADDRESS FROM STRIPE?
  });

  // CHANGE TO GET FROM STRIPE LINE ITEMS
  for (let i = 0; i < user.cart.cartItems.length; i++) {
    // Put items in the cart into the OrderItem table -- IS THERE A WAY TO GET THIS DATA BACK FROM STRIPE INSTEAD?
    const orderItem = await OrderItem.create({
      orderedPrice: user.cart.cartItems[i].artwork.price,
      orderedQuantity: user.cart.cartItems[i].quantity
    });

    // ADD ARTWORK ID TO STRIPE REQUEST OBJECT, THEN HARVEST IT HERE SOMEHOW
    // Associate artwork with OrderItem
    const artwork = await Artwork.findByPk(user.cart.cartItems[i].artwork.id);
    artwork.addOrderItem(orderItem);

    // associate orderItems with the main order
    order.addOrderItem(orderItem);

    // decrement quantity in stock
    await artwork.update({ quantity: artwork.quantity - user.cart.cartItems[i].quantity });
  }

  // associate the order with the user
  user.addOrder(order);

  // clear the cart
  const userCart = await Cart.findByPk(user.cart.id);
  await CartItem.destroy({
    where: { cartId: userCart.id }
  });
  await userCart.destroy();
}

async function handleGuestUser(session) {
  // Get line items from Stripe req object
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
  console.log(lineItems);

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
      orderedQuantity: lineItems.data[i].quantity
    });

    // Associate artwork with OrderItem -- NEED TO PUT ARTWORK ID IN THE DATA SENT TO STRIPE
    // const artwork = await Artwork.findByPk(user.cart.cartItems[i].artwork.id);
    // artwork.addOrderItem(orderItem);

    // associate orderItems with the main order
    order.addOrderItem(orderItem);

    // decrement quantity in stock
    // await artwork.update({ quantity: artwork.quantity - user.cart.cartItems[i].quantity }); -- NEED TO GET ARTWORK FROM ABOVE LINE
  
  }
  // TODO: CLEAR THE LOCAL CART IN THE ORDER CONFIRMATION COMPONENT AT COMPONENT DID MOUNT

}
// TODO
function sendConfirmationEmail() {

}

module.exports = router;
