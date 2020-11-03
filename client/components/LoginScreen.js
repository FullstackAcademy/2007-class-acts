import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setUser } from '../redux/user'
import { setCartItems, addMultipleCartItems } from '../redux/cart'
import { localCart, clearLocalCart } from '../localCart/'

class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      redirect: false,
      emError: null,
      pwError: null
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleLogin(ev) {
    ev.preventDefault()
    //clear old errors first
    await this.setState({...this.state, emError: null, pwError: null})
    const { email, password } = this.state
    //check if this is a valid email address
    if(this.validateEmail(email)) {
      //check if pw is 4 or more chars
      if(password.length >= 4) {
        //then try to login
        try {
          const user = (await axios.post('/api/users/login', { ...this.state })).data
          this.props.setUser(user)
          //combine localStorage cart with DB cart and empty out localStorage
          if(user.cart) this.props.setCartItems(user.cart.cartItems)
          if(localCart.length > 0) this.props.addMultipleCartItems(localCart)
          clearLocalCart();
          //redirect on login
          this.setState({...this.state, redirect: true})
        } catch(err) {
          //do some error handling
          if(err.response.status < 500) {
            this.setState({...this.state, ...err.response.data})
          } else {
            this.setState({...this.state, pwError: 'Something went wrong.'})
          }
        }
      } else {
        //give bad pw feedback
        this.setState({...this.state, pwError:'Password minimum 4 characters.'})
      }
    } else {
      //give bad email feedback
      this.setState({...this.state, emError:'Must be valid email.'})
    }
  }

  handleChange(ev) {
    this.setState({ ...this.state, [ev.target.name]: ev.target.value })
  }

  validateEmail(email) {
    return email.includes('@') && email.includes('.')
  }

  render() {
    const { emError, pwError } = this.state
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
    return (
      <div className="container login">
        <form id="login-form" onSubmit={this.handleLogin}>
          <h2>Log in</h2>
          <hr />
          <input name="email" placeholder="Email" onChange={this.handleChange}/>
          { emError ? <h5 className="noQty">{emError}</h5> : <div /> }
          <input name="password" type="password" placeholder="Password" onChange={this.handleChange}/>
          { pwError ? <h5 className="noQty">{pwError}</h5> : <div /> }
          <button type="submit" id="login-button">Log in </button>
          <hr />
          <Link to="/newuser">Create an account!</Link>
          <hr />
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user)),
    setCartItems: (cartItems) => dispatch(setCartItems(cartItems)),
    addMultipleCartItems: (cartItems) =>
      dispatch(addMultipleCartItems(cartItems)),
  }
}

export default connect(null, mapDispatchToProps)(LoginScreen)
