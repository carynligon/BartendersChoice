import React from 'react';

import UserModal from '../UserModal';

export default React.createClass({
  render() {
    return(
      <UserModal>
      <form className="login-signup-form" onSubmit={this.signup}>
        <h2 className="signup-title">SIGN UP</h2>
        <input type="text" placeholder="first name" id="firstName" ref="firstName"/>
        <input type="text" placeholder="last name" id="lastName" ref="lastName"/>
        <input type="email" placeholder="email" id="email" ref="email"/>
        <input type="text" placeholder="username" id="username" ref="username"/>
        <input type="password" placeholder="password" id="password" ref="password"/>
        <input type="password" placeholder="confirm password" id="confirm-password" ref="confirmPassword"/>
        <input type="submit" value="submit" id="submit-login-btn"/>
        {loginBtn}
      </form>
      </UserModal>
    );
  }
});
