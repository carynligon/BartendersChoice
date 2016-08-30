import React from 'react';
import {Link, hashHistory} from 'react-router';

import store from '../../store';

import UserModal from '../UserModal';

export default React.createClass({
  getInitialState() {
    return {};
  },
  signup(e) {
    e.preventDefault();
    let password = this.refs.password.value;
    let confirmPassword = this.refs.confirmPassword.value;
    if (password !== confirmPassword) {
      this.setState({passwordError: true});
    } else {
      let username = this.refs.username.value;
      let password = this.refs.password.value;
      let firstName = this.refs.firstName.value;
      let lastName = this.refs.lastName.value;
      let email = this.refs.email.value;
      store.session.signup(firstName, lastName, username, password, email).then((response) => {
        if (response) {
          this.props.hideModal();
        } else {
          this.setState({usernameError: true});
        }
      });
    }
  },
  clearErrors() {
    this.setState({
      usernameError: false,
      passwordError: false
    });
  },
  render() {
    let errorMsg;
    let usernameStyles;
    let passwordStyles;
    let usernameErrorMsg;
    let passwordErrorMsg;
    if (this.state.usernameError) {
      usernameStyles = {
        background: '#FF3C38',
        color: '#fff'
      };
      usernameErrorMsg = (<p id="username-error">username already taken</p>);
    }
    if (this.state.passwordError) {
      passwordStyles = {
        background: '#FF3C38',
        color: '#fff'
      };
      passwordErrorMsg = (<p id="password-error">passwords don't match</p>)
    }
    return(
      <UserModal hideModal={this.props.hideModal}>
        <form className="login-signup-form" onSubmit={this.signup}>
          <h2 className="signup-title">SIGN UP</h2>
          <input type="text" placeholder="first name" id="firstName" onKeyUp={this.clearErrors} ref="firstName" required/>
          <input type="text" placeholder="last name" id="lastName" onKeyUp={this.clearErrors} ref="lastName" required/>
          <input type="email" placeholder="email" id="email" onKeyUp={this.clearErrors} ref="email" required/>
          <input type="text" placeholder="username" id="username" style={usernameStyles} onKeyUp={this.clearErrors} ref="username" required/>
          {usernameErrorMsg}
          <input type="password" placeholder="password" id="password" onKeyUp={this.clearErrors} style={passwordStyles} ref="password" required/>
          <input type="password" placeholder="confirm password" id="confirm-password" onKeyUp={this.clearErrors} style={passwordStyles} ref="confirmPassword" required/>
          {passwordErrorMsg}
          <button type="submit" id="submit-login-btn">submit</button>
          <p id="switch-login">Already have an account?<span id="signup-btn" onClick={this.props.showLogin}>Sign in!</span></p>
        </form>
      </UserModal>
    );
  }
});
