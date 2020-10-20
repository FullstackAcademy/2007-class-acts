import React, { Component } from 'react'


class LoginScreen extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin(ev) {
    ev.preventDefault()
  }

  render() {
    return (
      <div className="login-form">
        <form onSubmt={this.handleLogin}>
          <h2>Sign in</h2>
          <input name="username" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button type="submit" className="login-button">Sign in </button>
        </form>
      </div>
    )
  }
}

export default LoginScreen
