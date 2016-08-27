import React from 'react';
import {Link, hashHistory} from 'react-router';

import store from '../../store';

import UserModal from '../UserModal';

export default React.createClass({
  getInitialState() {
    return {content: 'login'};
  },
  login(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    store.session.login(username, password);
    this.props.hideModal();
  },
  signup(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    let firstName = this.refs.firstName.value;
    let lastName = this.refs.lastName.value;
    let email = this.refs.email.value;
    store.session.signup(firstName, lastName, username, password, email);
    this.props.hideModal();
  },
  showSignup() {
    this.setState({content: 'signup'});
  },
  showLogin() {
    this.setState({content: 'login'});
  },
  render() {
    console.log(this.props);
    let form;
    if (this.state.content === 'login') {
      form = (<form className="login-signup-form" onSubmit={this.login}>
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
        <p>Don't have an account?<span id="signup-btn" onClick={this.showSignup}>Sign up!</span></p>
      </form>);
    } else {
      form = (<form className="login-signup-form" onSubmit={this.signup}>
        <h2 className="signup-title">SIGN UP</h2>
        <input type="text" placeholder="first name" id="firstName" ref="firstName"/>
        <input type="text" placeholder="last name" id="lastName" ref="lastName"/>
        <input type="text" placeholder="email" id="email" ref="email"/>
        <input type="text" placeholder="username" id="username" ref="username"/>
        <input type="password" placeholder="password" id="password" ref="password"/>
        <input type="password" placeholder="confirm password" id="confirm-password" ref="confirmPassword"/>
        <input type="submit" value="submit" id="submit-login-btn"/>
        <p>Already have an account?<span id="signup-btn" onClick={this.showLogin}>Sign in!</span></p>
      </form>);
    }
    return(
      <UserModal>
        {form}
      </UserModal>
    );
  }
});
