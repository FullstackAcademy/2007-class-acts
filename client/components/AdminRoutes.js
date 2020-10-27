import React from 'react'
import { Route, Switch, Link, useRouteMatch } from 'react-router-dom'
import AdminArtList from './AdminArtList'
import ArtworkForm from './ArtworkForm'

const AdminRoutes = () => {
  const { path, url } = useRouteMatch()
  return (
    <div>
      <div className="admin-nav">
        <ul>
          <li>
            <Link to={`${url}/artwork`}>Artwork</Link>
          </li>
          <li>
            <Link to={`${url}/users`}>Users</Link>
          </li>
          <li>
            <Link to={`${url}/orders`}>Orders</Link>
          </li>
        </ul>
        <Switch>
          <Route path={`${path}/artwork`} exact component={AdminArtList} />
          <Route path={`${path}/addnew`} exact component={ArtworkForm} />
        </Switch>
      </div>
    </div>
  )
}

export default AdminRoutes
