// LIBRARIES
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArtworks } from '../redux/artworks';

export class Cart extends Component {
  render() {
    const {artworks, cart} = this.props
    //if you go directly to the cart page, you don't have the artwork, so this is a workaround but we probably need to figure out the right way to do this later.
    if(artworks.length === 0) {
      this.props.getArtworks();
      return (<div>Loading</div>)
    }

    //if nothing in cart, say something nice:
    if(cart.length === 0) {
      return (
        <div>
          <h2>Your cart is empty!</h2>
        </div>
      )
    }

    //this is crummy looking but works for viewing the cart for now
    return (
      <div>
        { cart.map(cartItem => {
          const cartItemArtwork = artworks.find(art => art.id === cartItem.artworkId)
          return (
            <div key={cartItem.artworkId}>
              <h4>{ cartItemArtwork.title }</h4>
              <h5><i>{ cartItemArtwork.artist.name }</i></h5>
              <h5>
                Quantity: { cartItem.quantity }
              </h5>
              <hr />
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    artworks: state.artworks
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getArtworks: () => dispatch(getArtworks()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
