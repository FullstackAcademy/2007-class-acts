import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { destroySession } from '../redux/user';
import { setCart } from '../redux/cart'


const Account = ({ user, _destroySession, setCart }) => {
  const { email, isAdmin } = user
  const sessionId = document.cookie.split('=')[1]
  if(!sessionId) return (<Redirect to="/" />)
  return (
    <div>
      <p>User Details</p>
      <p>Email: {email} </p>
      <p>Admin: {isAdmin ? 'Yep' : 'Nope'} </p>
      <Link to="/" onClick={()=>{
          document.cookie = 'sessionId=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          _destroySession(sessionId);
          //also empty out the cart
          setCart([]);
          localStorage.graceCart = []
        }}>Log Out</Link>
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
      setCart: (cart) => dispatch(setCart(cart))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Account);
