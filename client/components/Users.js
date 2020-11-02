import React from 'react';
import { connect } from 'react-redux';
import  { getUsers, destroyUser, updateUsers }  from '../redux/users';


export class Users extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
            adminUsers: []
        }
        this.handleChecked = this.handleChecked.bind(this)
        this.handleResetPassword = this.handleResetPassword.bind(this)

    }

    async componentDidMount(){
        await this.props.getUsers()
        this.setState({users: this.props.users})
    }

    handleChecked(ev){
        //Needs to be integrated with backend
        console.log('122', user)
        if(ev.target.checked) {
            console.log(ev.target.value)
            console.log("321321213")
            const updatedAdminUsers = [...this.state.adminUsers, ev.target.name]
            this.setState({adminUsers: updatedAdminUsers})
            // this.props.updateAdminStatus(adminUsers)
            console.log(`${ev.target.name} is now admin`);
        }
        else {
            const updatedAdminUsers = this.state.adminUsers.filter( u => u !== ev.target.value)
            this.setState({adminUsers: updatedAdminUsers});
            console.log(`${ev.target.name} is no longer an admin`)
        }
    }

    handleResetPassword(ev){
        //Needs to be integrated with backend
        alert("Needs to be integrated with backend")
    }

   render(){
       return (
           <div>
               <h1>Users</h1>
               <div className="adminNav">
                   <div>Products</div>
                   <div>Users</div>
                   <div>Orders</div>
               </div>
               <table id="table">
                    <thead>
                        <tr>
                            <th>Name</th>
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
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td><button onClick={this.handleResetPassword}>Reset</button></td>
                                <td><button name={user.name} value={user.id} onClick={() => {
                                     if(this.state.adminUsers.includes(user.name)){
                                         alert('Change admin status before deleting')
                                     } else {
                                         console.log(`${user.name} deleted`)
                                         const updatedUsers = this.state.users.filter( u => u.name !== user.name)
                                         this.setState({users: updatedUsers})
                                     }
                                    this.props.deleteUser(user)}}>X</button></td>
                                <td><input name={user.name} type="checkbox" onChange={() => {
                                    user.isAdmin = !user.isAdmin;
                                    this.props.updateAdminStatus(user)
                                    console.log(user)
                                }} /></td>
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
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => dispatch(getUsers()),
        deleteUser: (user) => dispatch(destroyUser(user)),
        updateAdminStatus: (user) => dispatch(updateUsers(user))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Users);
