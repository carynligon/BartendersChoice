import React from 'react';
import {Link} from 'react-router';

import store from '../store';

export default React.createClass({
  login(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    store.session.login(username, password)
  },
  signup(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    let firstName = this.refs.firstName.value;
    let lastName = this.refs.lastName.value;
    let email = this.refs.email.value;
    store.session.signup(firstName, lastName, username, password, email);
  },
  containerStyles: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'rgba(0,0,0,.5)'
  },
  contentStyles: {
    background: 'white',
    width: '700px',
    margin: '0 auto',
    height: '60vh',
    marginTop: '12.5%',
    overflow: 'scroll'
  },
  render() {
    let form;
    if (this.props.route.path === '/login') {
      form = (
        <form className="login-signup-form" onSubmit={this.login}>
          <input type="text" placeholder="username" id="username" ref="username"/>
          <input type="password" placeholder="password" id="password" ref="password"/>
          <input type="submit" value="submit" id="submit-login-btn"/>
          <p>Need an account? <Link to="/signup">Sign up!</Link></p>
        </form>
      );
    } else {
      form = (
        <form className="login-signup-form" onSubmit={this.signup}>
          <input type="text" placeholder="firstName" id="firstName" ref="firstName"/>
          <input type="text" placeholder="lastName" id="lastName" ref="lastName"/>
          <input type="email" placeholder="email" id="email" ref="email"/>
          <input type="text" placeholder="username" id="username" ref="username"/>
          <input type="password" placeholder="password" id="password" ref="password"/>
          <input type="password" placeholder="confirm password" id="confirm-password" ref="confirmPassword"/>
          <input type="submit" value="submit" id="submit-login-btn"/>
          <p>Have an account? <Link to="/login">Login!</Link></p>
        </form>
      );
    }
    return(
      <div className="modal-container" style={this.containerStyles}>
        <div className="modal-content" style={this.contentStyles}>
          {form}
        </div>
      </div>
    );
  }
});
