import React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';

import Confirm from './components/pages/Confirm';
import App from './components/pages/App';
import LoginModal from './components/LoginModal';
import Recipe from './components/pages/Recipe';
import Assessment from './components/pages/Assessment';
import AssessmentInfo from './components/AssessmentInfo';
import SingleQuestion from './components/pages/SingleQuestion';
import Results from './components/pages/Results';

const router = (
  <Router history={hashHistory}>
    <Route path="/confirm" component={Confirm}/>
    <Route path="/" component={App}>
      <Route path="/login" component={LoginModal}/>
      <Route path="/signup" component={LoginModal}/>
    </Route>
    <Route path="/recipe/:cocktail" component={Recipe}/>
    <Route path="/assessment" component={Assessment}>
      <IndexRoute component={AssessmentInfo}/>
      <Route path="/assessment/question" component={SingleQuestion}/>
      <Route path="/assessment/results" component={Results}/>
    </Route>
  </Router>
);

export default router;
