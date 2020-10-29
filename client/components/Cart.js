// LIBRARIES
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArtworks } from '../redux/artworks';
import { changeCartItem, removeCartItem } from '../redux/cart'

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

    //build quantity select options based on max quantity of each artwork in the cart
    const quantitySelect = (art) => {
      const quantitySelection = []
      for (let i = 1; i <= art.quantity; i++) {
        quantitySelection.push(<option key={i} value={i}>{i}</option>)
      }
      return quantitySelection
    }

    const changeQuantity = (qty, cartItem) => {
      let isLoggedIn = false
      if(this.props.user.id) isLoggedIn = true
      this.props.changeCartItem({...cartItem, quantity: +qty}, isLoggedIn)
    }

    const removeItem = (cartItem) => {
      let isLoggedIn = false
      if(this.props.user.id) isLoggedIn = true
      this.props.removeCartItem(cartItem, isLoggedIn)
    }


    //this is crummy looking but works for viewing the cart for now
    return (
      <div>
        { cart
          //added a cart sort so that items would be redrawn in same order when changing quantity
          .sort((a,b) => b.artworkId > a.artworkId ? -1 : 1)
          .map(cartItem => {
          const cartItemArtwork = artworks.find(art => art.id === cartItem.artworkId)
          const exceedsArtworkQuantity = cartItem.quantity > cartItemArtwork.quantity
          return (
            <div key={cartItem.artworkId}>
              <h4>{ cartItemArtwork.title }</h4>
              <h5><i>{ cartItemArtwork.artist.name }</i></h5>
              { exceedsArtworkQuantity ?
                <h5 className="noQty">You've added more to your cart ({cartItem.quantity}) than is currently in stock! Please choose a revised quantity.</h5>
               : null
              }
              <h5>
                Quantity:
              <select id="qty"
                defaultValue={cartItem.quantity}
                onChange={(ev)=>changeQuantity(ev.target.value, cartItem)}
              >
                {quantitySelect(cartItemArtwork)}
              </select>
                {/* { cartItem.quantity } */}
              </h5>
              <button onClick={()=>removeItem(cartItem)}>Remove from cart</button>
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
    artworks: state.artworks,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getArtworks: () => dispatch(getArtworks()),
    changeCartItem: (cartItem, isLoggedIn) => dispatch(changeCartItem(cartItem, isLoggedIn)),
    removeCartItem: (cartItem, isLoggedIn) => dispatch(removeCartItem(cartItem, isLoggedIn))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
