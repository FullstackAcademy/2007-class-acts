// LIBRARIES
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

// FILES
import AllArtwork from './AllArtwork';

const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/artwork">All Art</Link>
          <Link to="/cart">My Cart</Link>
        </nav>
        <Switch>
          <Route exact path="/artwork" component={ AllArtwork } />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;

