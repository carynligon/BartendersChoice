import React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';

import Confirm from './components/pages/Confirm';
import App from './components/pages/App';
import NotFound from './components/pages/NotFound';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import UserDashboard from './components/pages/UserDashboard';
import Recipe from './components/pages/Recipe';
import Assessment from './components/pages/Assessment';
import AssessmentInfo from './components/AssessmentInfo';
import SingleQuestion from './components/pages/SingleQuestion';
import Results from './components/pages/Results';
import Search from './components/pages/Search';
import Custom from './components/pages/Custom';

const router = (
  <Router history={hashHistory}>
    <Route path="/confirm" component={Confirm}/>
    <Route path="/" component={App}>
    </Route>
    <Route path="/search" component={Search}/>
    <Route path="/recipe/:cocktail" component={Recipe}/>
    <Route path="/assessment" component={Assessment}>
      <IndexRoute component={AssessmentInfo}/>
      <Route path="/assessment/question" component={SingleQuestion}/>
      <Route path="/assessment/results" component={Results}/>
    </Route>
    <Route path="/custom" component={Custom}/>
    <Route path="/me" component={UserDashboard}/>
    <Route path="*" component={NotFound}/>
  </Router>
);


export default router;
