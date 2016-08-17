import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
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
        <form className="login-signup-form">
          <input type="text" placeholder="username" id="username" ref="username"/>
          <input type="password" placeholder="password" id="password" ref="password"/>
          <input type="submit" value="submit" id="submit-login-btn"/>
          <p>Need an account? <Link to="/signup">Sign up!</Link></p>
        </form>
      );
    } else {
      form = (
        <form className="login-signup-form">
          <input type="text" placeholder="firstName" id="firstName" ref="firstName"/>
          <input type="text" placeholder="lastName" id="lastName" ref="lastName"/>
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
