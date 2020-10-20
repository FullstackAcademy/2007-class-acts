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
      <div className="container login">
        <form id="login-form" onSubmit={this.handleLogin}>
          <h2>Log in</h2>
          <hr />
          <input name="username" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button type="submit" id="login-button">Log in </button>
        </form>
      </div>
    )
  }
}

export default LoginScreen
