import axios from 'axios'
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'
import { stripeAPIKey } from '../../server/constants'
import { localCart } from '../localCart';

const stripePromise = loadStripe(stripeAPIKey)

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick() {
    try {
      const stripe = await stripePromise;
      const checkoutSession = (await axios.post('/checkout/session', { localCart: this.props.cart })).data;
      stripe.redirectToCheckout({ sessionId: checkoutSession.id }).then(function (result) {
        if (result.error) {
            alert(result.error.message);
        }
      }
      )
    } catch (err) {
      console.log(err)
      throw err
    }
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
            <p>Checkout total</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
        </div>
        {//if the client isnt logged in, get the cart from localstorage and send to db
        }
        {/* only enable this button if there are 1+ items in the cart */}
        {cart.length && <button id="checkout-btn" type="button" onClick={this.handleClick}>CHECKOUT</button>}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    cart: state.cart
  }
}

export default connect(mapState)(Checkout);
