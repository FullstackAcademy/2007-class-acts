import React from 'react';
import { connect } from 'react-redux';
import { getUsers, destroyUser, updateUser }  from '../redux/users';
import NotFound from './NotFound';

export class Users extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
            isChecked: true
        }
        this.handleResetPassword = this.handleResetPassword.bind(this)
        // this.updateCheckbox = this.updateCheckbox.bind(this)
        // this.pressButton = this.pressButton.bind(this)
        
    }

    async componentDidMount(){
        await this.props.getUsers()
        this.setState({users: this.props.users})

    }

    handleResetPassword(ev){
        //Needs to be implemented
        alert("Needs to be implemented")
    }

    // updateCheckbox(ev) {
    //     this.state.users.map(u=>{
    //         if(u.isAdmin){
    //             ev.target.checked
    //         }
    //     })
    // }

    // pressButton(ev){
    //     // ev.preventDefault();
    //     this.setState({isChecked: !this.state.is_checked});
    // }
    

   render(){
       // Checks to see if user is admin or not. If user is admin, then this.props.users.length > 0
       if (this.props.users.length === 0) return <NotFound />
       return (
           <div>
               <h1>Users</h1>
                <h2>{`Admin: ${this.props.user.isAdmin}`}</h2>
               <table id="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Email</th>
                            <th>Reset Password</th>
                            <th>Delete User</th>
                            <th>Admin User</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    this.state.users.map(user => {
                        return (
                            <tr key={user.id}>
                                <td>{user.id.slice(0,8)}</td>
                                <td>{user.email}</td> 

                                {/* Handels Resetting Password */}
                                <td><button onClick={this.handleResetPassword}>Reset</button></td>

                                {/* Handels Deleting a User */}
                                <td><button id={user.id} value={user.id} onClick={() => {
                                         const updatedUsers = this.state.users.filter( u => u.id !== user.id)
                                         this.setState({users: updatedUsers})
                                         this.props.deleteUser(user)}}>X</button></td>

                                {/* Handels Updating a User to admin/!admin  */}
                                    <td><input type="checkbox" checked={user.isAdmin ? "checked" : ""} onChange={ ()=>{
                                        user.isAdmin = !user.isAdmin
                                        this.props.updateAdminStatus(user)
                                    }}/>  
                                    </td>
                            </tr>
                            )}
                        )
                    }
                    </tbody>
                    </table>
           </div>
       )
   }
}

const mapStateToProps  = (state) => {
    return {
        users: state.users,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => dispatch(getUsers()),
        deleteUser: (user) => dispatch(destroyUser(user)),
        updateAdminStatus: (user) => dispatch(updateUser(user))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Users);
