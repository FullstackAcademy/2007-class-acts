import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';


class LoginScreen extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleLogin(ev) {
    ev.preventDefault()
    //do some logging in stuff
    console.log(this.state)
  }

  handleChange(ev) {
    this.setState({...this.state, [ev.target.name]: ev.target.value})
  }

  render() {
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

export default LoginScreen
