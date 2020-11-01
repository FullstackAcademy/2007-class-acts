// LIBRARIES
import React, { Component } from 'react';
import { connect } from 'react-redux';

// FILES
import { getArtworks } from '../redux/artworks';
import { changeCartItem, removeCartItem } from '../redux/cart'
import Checkout from './Checkout';

export class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
    this.quantitySelect = this.quantitySelect.bind(this)
    this.changeQuantity = this.changeQuantity.bind(this)
    this.removeItem = this.removeItem.bind(this)
  }

  //this has to be async/await so that the artworks are loaded
  async componentDidMount(){
    if(this.props.artworks.length === 0) await this.props.getArtworks();
    this.setState({...this.state, loading: false})
  }

  //build quantity select options based on max quantity of each artwork in the cart
  quantitySelect(art){
    const quantitySelection = []
    for (let i = 1; i <= art.quantity; i++) {
      quantitySelection.push(<option key={i} value={i}>{i}</option>)
    }
    return quantitySelection
  }

  changeQuantity(qty, cartItem){
    let isLoggedIn = false
    if(this.props.user.id) isLoggedIn = true
    this.props.changeCartItem({...cartItem, quantity: +qty}, isLoggedIn)
  }

  removeItem(cartItem){
    let isLoggedIn = false
    if(this.props.user.id) isLoggedIn = true
    this.props.removeCartItem(cartItem, isLoggedIn)
  }

  render() {
    const { artworks, cart } = this.props;

    //a beautiful loading message
    if(this.state.loading) {
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

    return (
      <div className="all-cart">
        <div className="cart-items">
          { cart
            //added a cart sort so that items would be redrawn in same order when changing quantity
            .sort((a,b) => b.artworkId > a.artworkId ? -1 : 1)
            .map(cartItem => {
              const cartItemArtwork = artworks.find(art => art.id === cartItem.artworkId)
              const exceedsArtworkQuantity = cartItem.quantity > cartItemArtwork.quantity
              return (
                <div key={cartItem.artworkId} className="cart-item">
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
                    onChange={(ev)=>this.changeQuantity(ev.target.value, cartItem)}
                  >
                    {this.quantitySelect(cartItemArtwork)}
                  </select>
                  </h5>
                  <button onClick={()=>this.removeItem(cartItem)}>Remove from cart</button>
                  <hr />
                </div>
              )
            })}
        </div>
        <Checkout cart={ cart } artworks={ artworks } />
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
