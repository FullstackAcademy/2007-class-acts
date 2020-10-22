import React, { Component } from 'react'
import axios from 'axios'
import {Link, Redirect} from 'react-router-dom';


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
    try {
      const res = await axios.post('/api/users', { ...this.state })
      console.log(res.data)
      this.setState({...this.state, redirect: true})
    } catch(e) {
      console.log(e.response.data)
    }
  }

  handleChange(ev) {
    this.setState({...this.state, [ev.target.name]: ev.target.value})
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/artwork'/>;
    }
    return (
      <div className="container login">
        <form id="login-form" onSubmit={this.handleLogin}>
          <h2>Create A New Account</h2>
          <hr />
          <input name="email" placeholder="Email" onChange={this.handleChange}/>
          <input name="password" type="password" placeholder="Password" onChange={this.handleChange}/>
          <button type="submit" id="login-button">Create Account</button>
          <hr />
          <Link to="/login">Log in</Link>
          <hr />
        </form>
      </div>
    )
  }
}

export default LoginScreen
