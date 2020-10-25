// LIBRARIES
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../redux/user'
import { setCart } from '../redux/cart'

export class Navbar extends Component {
render() {
    const isLoggedIn = !!this.props.user.id
    let isAdmin = false
    if(isLoggedIn) {
      isAdmin = this.props.user.isAdmin
    } else {
      //if there's a session cookie, get user info, update store, etc.
      const sessionId = document.cookie.split('=')[1]
      if(sessionId) {
        //redux stuff
        this.props.getUser(sessionId)
        //get the cart here, too; if there's no saved cart, use the existing cart and update the DB with it
      }
    }
    //get cart from redux store

    const cart = this.props.cart
    //if it ain't in redux but it is in localStorage, update the store with that cart
    if(cart.length === 0 && localStorage.graceCart) {
      this.props.setCart(JSON.parse(localStorage.graceCart))
    }
    return (
      <nav>
        <Link to="/" style={{ color: "white" }}>COLLECTION</Link>
        <Link to="/cart" style={{ color: "white" }}>CART ({cart.length})</Link>
        { isLoggedIn ?
            isAdmin ?
              <Link to="/account" style={{ color: "white" }}>ADMIN</Link> :
              <Link to="/account" style={{ color: "white" }}>ACCOUNT</Link> :
         <Link to="/login" style={{ color: "white" }}>LOGIN</Link>
        }
    </nav>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: (sessionId) => dispatch(getUser(sessionId)),
    setCart: (cart) => dispatch(setCart(cart)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
