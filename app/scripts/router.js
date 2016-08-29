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

function requireAuth(nextState, replace) {
  if (!localStorage.getItem('ofAge')) {
    replace({
      pathname: '/confirm',
      state: {nextPathname: nextState.location.pathname}
    });
  } else if (this.path === '/custom' && localStorage.getItem('username') === 'Anonymous') {
    replace({
      pathname: '/',
      state: {nextPathname: nextState.location.pathname}
    })
  }
}

const router = (
  <Router history={hashHistory}>
    <Route path="/confirm" component={Confirm}/>
    <Route path="/" component={App} onEnter={requireAuth}>
    </Route>
    <Route path="/search" component={Search} onEnter={requireAuth}/>
    <Route path="/recipe/:cocktail" component={Recipe} onEnter={requireAuth}/>
    <Route path="/assessment" component={Assessment} onEnter={requireAuth}>
      <IndexRoute component={AssessmentInfo}/>
      <Route path="/assessment/question/:id" component={SingleQuestion}/>
      <Route path="/assessment/results" component={Results}/>
    </Route>
    <Route path="/custom" component={Custom} onEnter={requireAuth}/>
    <Route path="/me" component={UserDashboard} onEnter={requireAuth}/>
    <Route path="*" component={NotFound} onEnter={requireAuth}/>
  </Router>
);


export default router;
