import axios from 'axios'
import React, {Component} from 'react';
import { loadStripe } from '@stripe/stripe-js'
import { stripeAPIKey } from '../../server/constants'
const stripePromise = loadStripe(stripeAPIKey)

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick() {
    const stripe = await stripePromise
    const checkoutSession = await (await (axios.post('/checkout/session'))).data
    stripe.redirectToCheckout({sessionId: checkoutSession.id})

  }

  render() {
    const { cart, artworks } = this.props
    let subtotal = 0;
    cart.map(cartItem => {
      const cartItemArtwork = artworks.find(art => art.id === cartItem.artworkId);
      subtotal += (cartItemArtwork.price * cartItem.quantity);
    })

    return (
      <div className="checkout">
        <div className="receipt">
          <div className="line-item">
            <p>Products total</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <div className="line-item">
            <p>Tax</p>
            <p>${(subtotal * 0.08).toFixed(2)}</p>
          </div>
          <div className="line-item">
            <p>Checkout total</p>
            <p>${(subtotal * 1.08).toFixed(2)}</p>
          </div>
        </div>
        {//if the client isnt logged in, get the cart from localstorage and send to db
        }
        <button id="checkout-btn" type="button" onClick={this.handleClick}>CHECKOUT</button>
      </div>
    )
  }
}

export default Checkout;
