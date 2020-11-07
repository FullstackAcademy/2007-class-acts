// LIBRARIES
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// FILES
import AdminRoutes from './AdminRoutes'
import AllArtwork from './AllArtwork'
import SingleArtwork from './SingleArtwork'
import LoginScreen from './LoginScreen'
import NewUser from './NewUser'
import Navbar from './Navbar'
import Account from './Account'
import Users from './Users'
import Cart from './Cart'
import ReviewForm from './ReviewForm'
import NotFound from './NotFound'
import ArtistForm from './ArtistForm'
import ArtworkForm from './ArtworkForm'
import ArtistList from './ArtistList'
import OrderConfirmation from './OrderConfirmation'
import ForgotPassword from './ForgotPassword'
import Orders from './Orders'
import OrderDetails from './OrderDetails'

const Routes = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path='/' component={AllArtwork} />
          <Route exact path='/artworks/:id' component={SingleArtwork} />
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/newuser' component={NewUser} />
          <Route exact path='/account' component={Account} />
          <AdminRoutes exact path='/admin/users' component={Users} />
          <AdminRoutes exact path='/admin/newartist' component={ArtistForm} />
          <AdminRoutes exact path='/admin/artists' component={ArtistList} />
          <AdminRoutes
            exact path='/admin/artist/edit/:id'
            render={(props) => <ArtistForm {...props} isEditing={true} />}
          />
          <AdminRoutes
            exact path='/admin/artworks/edit/:id'
            render={(props) => <ArtworkForm {...props} isEditing={true} />}
          />
          <AdminRoutes exact path='/admin/addnew' component={ArtworkForm} />
          <AdminRoutes exact path='/admin/users' component={Users} />
          <AdminRoutes exact path='/admin/orders' component={Orders} />
          <AdminRoutes exact path='/admin/orders/:id' component={OrderDetails} />
          <Route exact path="/cart" component={Cart} />
          <AdminRoutes exact path="/admin/forgotpassword/:userID" component={ForgotPassword} />
          <Route exact path="/review/:id" component={ReviewForm} />
          <Route exact path='/orderconfirmation' component={OrderConfirmation} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default Routes
