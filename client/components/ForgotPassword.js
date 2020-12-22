import React from 'react'
import axios from 'axios'

export default class ForgotPassword extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            password: '',
            message: null,
            color: 'red'
        }
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(ev) {
        this.setState({ ...this.state, [ev.target.name]: ev.target.value })
    }

    async handleChangePassword(ev){
        ev.preventDefault()
        const userID = this.props.match.params.userID
            try {
                const user = (await axios.put(`/api/users/${userID}`, {password: this.state.password})).data
                if(user.id) this.setState({...this.state, message: 'PW reset successful!', color: 'green'})
                else this.setState({...this.state, message: 'PW reset FAILED'})
            } catch (err) {
                this.setState({...this.state, message: 'PW reset FAILED'})
                console.log(err)
            }
    }

    render(){
        const { color, message } = this.state
        return(
            <div className="container login">
                <form id="resetPassword" onSubmit={this.handleChangePassword}>
                    <input name="password" type="password" placeholder="Password" onChange={this.handleChange}/>
                    <button type="submit" id="reset-password"> Reset Password </button>
                    <h4 style={{color}}>{message}</h4>
                </form>
            </div>
        )
    }
}
