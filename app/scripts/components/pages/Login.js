import React from 'react';
import {Link, hashHistory} from 'react-router';

import store from '../../store';

import UserModal from '../UserModal';

export default React.createClass({
  login(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    store.session.login(username, password)
    if (this.props.location.pathname === '/assessment/login') {
      hashHistory.push('/assessment');
    } else {
      hashHistory.push('/');
    }
  },
  render() {
    console.log(this.props.location);
    let signupBtn = (<p>Don't have an account?<Link to="/assessment/signup">Sign up!</Link></p>)
    if (this.props.route.path === '/login') {
      signupBtn = (<p>Don't have an account?<Link to="/signup">Sign up!</Link></p>);
    }
    return(
      <UserModal>
        <form className="login-signup-form" onSubmit={this.login}>
          <h2 className="login-title">SIGN IN</h2>
          <div className="username">
            <label htmlFor="username"><i className="fa fa-user user-icon" aria-hidden="true"></i></label>
            <input type="text" placeholder="username" id="username" ref="username"/>
          </div>
          <div className="password">
            <label htmlFor="password"><i className="fa fa-unlock-alt password-icon" aria-hidden="true"></i></label>
            <input type="password" placeholder="password" id="password" ref="password"/>
          </div>
          <input type="submit" value="submit" id="submit-login-btn"/>
          {signupBtn}
        </form>
      </UserModal>
    );
  }
});
