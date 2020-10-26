import React, { Component } from 'react'
import axios from 'axios'
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser }from '../redux/user'
import { setCartItems } from '../redux/cart'

class LoginScreen extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      redirect: false
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleLogin(ev) {
    ev.preventDefault()
    //do some logging in stuff
    try {
      const res = await axios.post('/api/users/login', { ...this.state })
      const user = res.data
      this.props.setUser(user)
      //combine carts here
      if(user.cart) this.props.setCartItems(user.cart.cartItems)
      this.setState({...this.state, redirect: true})
    } catch(e) {
      //do some error handling
      console.log(e)
    }
  }

  handleChange(ev) {
    this.setState({...this.state, [ev.target.name]: ev.target.value})
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/'/>;
    }
    return (
      <div className="container login">
        <form id="login-form" onSubmit={this.handleLogin}>
          <h2>Log in</h2>
          <hr />
          <input name="email" placeholder="Email" onChange={this.handleChange}/>
          <input name="password" type="password" placeholder="Password" onChange={this.handleChange}/>
          <button type="submit" id="login-button">Log in </button>
          <hr />
          <Link to="/newuser">Create an account!</Link>
          <hr />
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: (user) => dispatch(setUser(user)),
    setCartItems: (cartItems) => dispatch(setCartItems(cartItems))
  }
}

export default connect(null, mapDispatchToProps)(LoginScreen);
