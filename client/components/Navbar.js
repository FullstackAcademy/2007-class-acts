// LIBRARIES
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../redux/user'

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
      }
    }
    return (
      <nav>
        <Link to="/" style={{ color: "white" }}>COLLECTION</Link>
        <Link to="/cart" style={{ color: "white" }}>CART</Link>
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
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: (sessionId) => dispatch(getUser(sessionId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
