import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const AdminRoutes = ({component, user, ...props}) => {
  const Component = component
  return ( user.isAdmin ?
    <Component {...props}/> : <Redirect to="/notfound" />
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}
export default connect(mapStateToProps)(AdminRoutes)
