import React from 'react';
import {Router, Route, hashHistory} from 'react-router';

import Confirm from './components/Confirm';
import App from './components/App';
import Recipe from './components/Recipe';

const router = (
  <Router history={hashHistory}>
    <Route path="/confirm" component={Confirm}/>
    <Route path="/" component={App}/>
    <Route path="/recipe/:cocktail" component={Recipe}/>
  </Router>
);

export default router;
