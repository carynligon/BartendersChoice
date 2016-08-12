import React from 'react';
import {Router, Route, hashHistory} from 'react-router';

import Confirm from './components/Confirm';
import App from './components/App';

const router = (
  <Router history={hashHistory}>
    <Route path="/confirm" component={Confirm}/>
    <Route path="/" component={App}/>
  </Router>
);

export default router;
