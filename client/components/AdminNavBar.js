import React from 'react'
import { Link } from 'react-router-dom'


const AdminNavBar = () => {
  return (
    <div>
      <div className="admin-nav">
        <Link to='/admin/addnew' >
          Add to Collection
        </Link>
        <Link to='/admin/artists'>
          Manage Artists
        </Link>
        <Link to='/admin/users' >
          Users
        </Link>
        <Link to='/admin/orders' >
          Orders
        </Link>
      </div>
    </div>
  )
}

export default AdminNavBar
