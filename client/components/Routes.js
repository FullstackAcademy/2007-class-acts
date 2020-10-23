// LIBRARIES
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

// FILES
import AllArtwork from './AllArtwork';
import SingleArtwork from './SingleArtwork'
import LoginScreen from './LoginScreen'

const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          {/* <Link to="/" style={{ color: "white" }}>HOME</Link> */}
          <Link to="/" style={{ color: "white" }}>COLLECTION</Link>
          <Link to="/cart" style={{ color: "white" }}>CART</Link>
          <Link to="/login" style={{ color: "white" }}>LOGIN</Link>
        </nav>
        <Switch>
          <Route exact path="/" component={AllArtwork} />
          <Route exact path="/artworks/:id" component={SingleArtwork} />
          <Route exact path="/login" component={LoginScreen} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;

