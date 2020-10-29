import React from 'react'
import { Route, Switch, NavLink, useRouteMatch } from 'react-router-dom'
import AdminArtList from './AdminArtList'
import ArtworkForm from './ArtworkForm'

const AdminRoutes = () => {
  const { path, url } = useRouteMatch()
  return (
    <div>
      <div className="admin-nav">
          <NavLink to={`${url}/artwork`} activeClassName="selected-admin-link" >Artwork</NavLink>
          <NavLink to={`${url}/users`} activeClassName="selected-admin-link" >Users</NavLink>
          <NavLink to={`${url}/orders`} activeClassName="selected-admin-link" >Orders</NavLink>
      </div>
        <Switch>
          <Route path={`${path}/artwork`} exact component={AdminArtList} />
          <Route path={`${path}/addnew`} exact component={ArtworkForm} />
        </Switch>
    </div>
  )
}

export default AdminRoutes