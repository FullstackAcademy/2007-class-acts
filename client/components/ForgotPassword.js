import React from 'react'
import axios from 'axios'

export default class ForgotPassword extends React.Component{
    constructor(props){
        super(props)
        this.handleChangePassword = this.handleChangePassword.bind(this)
    }
    async handleChangePassword(ev){
        ev.preventDefault()
        const userID = this.props.match.params.userID
        console.log('id',userID)
            try {
                const res = await axios.put(`/api/users/${userID.slice(1)}`, {password: this.password})
                console.log('data', res.data)
            } catch (err) {
                console.log(err)
            }
    }

    render(){
        return(
            <div className="container login">
                <form id="resetPassword" onSubmit={this.handleChangePassword}>
                    <input name="password" type="password" placeholder="Password" onChange={e => this.password = e.target.value}/>
                    <button type="submit" id="reset-password"> Reset Password </button>
                </form>
            </div>
        )
    }   
}
