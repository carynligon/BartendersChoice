import React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';

import Confirm from './components/Confirm';
import App from './components/App';
import Recipe from './components/Recipe';
import Assessment from './components/Assessment';
import AssessmentInfo from './components/AssessmentInfo';
import SingleQuestion from './components/SingleQuestion';

const router = (
  <Router history={hashHistory}>
    <Route path="/confirm" component={Confirm}/>
    <Route path="/" component={App}/>
    <Route path="/recipe/:cocktail" component={Recipe}/>
    <Route path="/assessment" component={Assessment}>
      <IndexRoute component={AssessmentInfo}/>
      <Route path="/assessment/:question" component={SingleQuestion}/>
    </Route>
  </Router>
);

export default router;
