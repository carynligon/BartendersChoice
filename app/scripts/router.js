import React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';

import Confirm from './components/Confirm';
import App from './components/App';
import Recipe from './components/Recipe';
import Assessment from './components/Assessment';
import AssessmentInfo from './components/AssessmentInfo';
import SingleQuestion from './components/SingleQuestion';
import Results from './components/Results';

const router = (
  <Router history={hashHistory}>
    <Route path="/confirm" component={Confirm}/>
    <Route path="/" component={App}/>
    <Route path="/recipe/:cocktail" component={Recipe}/>
    <Route path="/assessment" component={Assessment}>
      <IndexRoute component={AssessmentInfo}/>
      <Route path="/assessment/question" component={SingleQuestion}/>
      <Route path="/assessment/results" component={Results}/>
    </Route>
  </Router>
);

export default router;
