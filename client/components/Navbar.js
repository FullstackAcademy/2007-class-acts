// LIBRARIES
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from '../redux/user'
import { setCartItems } from '../redux/cart'
import { localCart } from '../localCart/'
import AdminNavBar from './AdminNavBar'
import { getCookieValue } from '../../server/utils'

export class Navbar extends Component {
  render() {
    const isLoggedIn = !!this.props.user.id
    let isAdmin = false
    if (isLoggedIn) {
      isAdmin = this.props.user.isAdmin
    } else {
      //if there's a session cookie, get user info, update store, etc.
      const sessionId = getCookieValue('sessionId')
      if (sessionId) {
        //set the user if there's a session ID
        this.props.getUser(sessionId)
      } else {
        //otherwise set the cart from local Storage if redux cart is empty
        if (this.props.cart.length === 0 && localCart.length > 0)
          this.props.setCartItems(localCart)
      }
    }

    const cartQty = this.props.cart.reduce((total, cartItem) => {
      total += +cartItem.quantity
      return total
    }, 0)

    return (
      <div>
        <nav>
          <Link to="/" style={{ color: 'white' }}>
            COLLECTION
          </Link>
          <Link to="/cart" style={{ color: 'white' }}>
            CART ({cartQty})
          </Link>
          {isLoggedIn ?
            (<Link to="/account" style={{ color: 'white' }}>
                ACCOUNT
              </Link>)
          :
            (<Link to="/login" style={{ color: 'white' }}>
              LOGIN
            </Link>
            )}
        </nav>
        {isAdmin && <AdminNavBar/>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    cart: state.cart,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (sessionId) => dispatch(getUser(sessionId)),
    setCartItems: (cartItems) => dispatch(setCartItems(cartItems)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
