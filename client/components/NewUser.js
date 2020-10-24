import React, { Component } from 'react'
import axios from 'axios'
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser }from '../redux/user'


class NewUser extends Component {
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
      const user = res.data
      this.props.setUser(user)
      this.setState({...this.state, redirect: true})
    } catch(e) {
      //do some error handling
      console.log(e.response.data.message)
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


const mapDispatchToProps = dispatch => {
  return {
    setUser: (user) => dispatch(setUser(user)),
  }
}

export default connect(null, mapDispatchToProps)(NewUser);

