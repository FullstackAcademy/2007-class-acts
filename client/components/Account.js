import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { destroySession } from '../redux/user'
import { setCartItems } from '../redux/cart'

const Account = ({ user, _destroySession, setCartItems }) => {
  const { email, isAdmin } = user
  const sessionId = document.cookie.split('=')[1]
  if (!sessionId) return <Redirect to="/" />
  return (
    <div>
      <p>User Details</p>
      <p>Email: {email} </p>
      <p>Admin: {isAdmin ? 'Yep' : 'Nope'} </p>
      <Link
        to="/"
        onClick={() => {
          //give a cookie an expiration date in the past in order to delete it
          document.cookie =
            'sessionId=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
          //get rid of the session so you're not automatically logged back in
          _destroySession(sessionId)
          //empty your redux cart if you log out. this is so you don't have
          //stuff sitting in your cart after logging out that would then be
          //combined into your cart AGAIN when you log back in.
          setCartItems([])
        }}>
        Log Out
      </Link>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    _destroySession: (id) => dispatch(destroySession(id)),
    setCartItems: (cartItems) => dispatch(setCartItems(cartItems)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
