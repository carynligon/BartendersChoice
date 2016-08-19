import React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';

import Confirm from './components/pages/Confirm';
import App from './components/pages/App';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import UserInfo from './components/pages/UserInfo';
import Recipe from './components/pages/Recipe';
import Assessment from './components/pages/Assessment';
import AssessmentInfo from './components/AssessmentInfo';
import SingleQuestion from './components/pages/SingleQuestion';
import Results from './components/pages/Results';
import Search from './components/pages/Search';

const router = (
  <Router history={hashHistory}>
    <Route path="/confirm" component={Confirm}/>
    <Route path="/" component={App}>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/user-info" component={UserInfo}/>
    </Route>
    <Route path="/search/:searchQuery" component={Search}/>
    <Route path="/recipe/:cocktail" component={Recipe}/>
    <Route path="/assessment" component={Assessment}>
      <IndexRoute component={AssessmentInfo}/>
      <Route path="/assessment/login" component={Login}/>
      <Route path="/assessment/signup" component={Signup}/>
      <Route path="/assessment/user-info" component={UserInfo}/>
      <Route path="/assessment/question" component={SingleQuestion}/>
      <Route path="/assessment/results" component={Results}/>
    </Route>
  </Router>
);

export default router;
