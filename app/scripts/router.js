import React from 'react';
import {Router, Route, hashHistory} from 'react-router';

import Confirm from './components/Confirm';

const router = (
  <Router history={hashHistory}>
    <Route path="/confirm" component={Confirm}/>
  </Router>
);

export default router;
