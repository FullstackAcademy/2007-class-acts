// LIBRARIES
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

// FILES
import AllArtwork from './AllArtwork';
import LoginScreen from './LoginScreen'

const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/artwork">All Art</Link>
          <Link to="/cart">My Cart</Link>
          <Link to="/login">Login</Link>
        </nav>
        <Switch>
          <Route exact path="/artwork" component={AllArtwork} />
          <Route exact path="/login" component={LoginScreen} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;

