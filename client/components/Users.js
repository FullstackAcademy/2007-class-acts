import React from 'react';
import {connect} from 'react-redux';
// import { getUsers } from '../redux/';
import faker from 'faker';

export class Users extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
            adminUsers: []
        }
        this.handleChecked = this.handleChecked.bind(this)
        this.handleDeleteUser = this.handleDeleteUser.bind(this)
        this.handleResetPassword = this.handleResetPassword.bind(this)

    }

    componentDidMount(){
        // I'll change the code below once we confirm the users data
        let tempArrOfUsers = []; // Added 10 users from faker as dummy data
        while(tempArrOfUsers.length < 11){
            tempArrOfUsers.push(faker.name.firstName())
        }
        this.setState({users: tempArrOfUsers})
    }


    async handleDeleteUser(ev) {
        // Changed the local state. I'll update the store once the users data is confirmed
        if(this.state.adminUsers.includes(ev.target.name)){
            alert('Change admin status before deleting')
        } else {
            console.log(`${ev.target.name} deleted`)
            const updatedUsers = await this.state.users.filter( u => u !== ev.target.name)
            this.setState({users: updatedUsers})     
        }
        //In case I need to use it later 
            /* let rowNumber = ev.target.value;
            document.getElementById("table").deleteRow(rowNumber + 1)*/
    }   

    handleChecked(ev){
        //Needs to be integrated with backend
        if(ev.target.checked) {
            const updatedAdminUsers = [...this.state.adminUsers, ev.target.name]
            this.setState({adminUsers: updatedAdminUsers})
            console.log(`${ev.target.name} is now admin`);
        }
        else {
            const updatedAdminUsers = this.state.adminUsers.filter( u => u !== ev.target.name)
            this.setState({adminUsers: updatedAdminUsers});
            console.log(`${ev.target.name} is no longer an admin`)
        }
    }

    handleResetPassword(ev){
        //Needs to be integrated with backend
        alert("Needs to be integrated with backend")
    }

   render(){
       let id = 0; // will change id to pk when users data is confirmed
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
                            <tr key={++id}>
                                <td>{user}</td>
                                <td>{`${user}@email.com`}</td>
                                <td><button onClick={this.handleResetPassword}>Reset</button></td>
                                <td><button name={user} value={id} onClick={this.handleDeleteUser}>X</button></td>
                                <td><input name={user} type="checkbox" onChange={this.handleChecked} /></td>
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
        // users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // getUsers: () => dispatch(getUsers()), 
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Users);