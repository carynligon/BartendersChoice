import React from 'react';
import {Link} from 'react-router';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return{windowWidth: window.innerWidth};
  },
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
  logout() {
    store.session.logout();
  },
  handleResize() {
    this.setState({windowWidth: window.innerWidth});
  },
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  },
  render() {
    let containerStyles = {
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: 'rgba(0,0,0,.5)'
    };
    let contentStyles;
    if (this.state.windowWidth <= 500) {
      contentStyles = {
        background: 'white',
        width: '100%',
        height: '100%'
      };
    } else {
      contentStyles = {
        background: 'white',
        width: '500px',
        margin: '0 auto',
        height: '60vh',
        marginTop: '12.5%',
        overflow: 'scroll'
      };
    }
    let form;
    let signupBtn = (<p>Need an account? <Link to="/signup">Sign up!</Link></p>);
    let loginBtn = (<p>Have an account? <Link to="/login">Login!</Link></p>);

    if (this.props.route.path === '/assessment/login') {
      signupBtn = (<p>Need an account? <Link to="/assessment/signup">Sign up!</Link></p>)
    } else if (this.props.route.path === '/assessment/signup') {
      signupBtn = (<p>Need an account? <Link to="/assessment/login">Login!</Link></p>)
    }

    if (this.props.route.path === '/login' || this.props.route.path === '/assessment/login') {
      form = (
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
      );
    } else if (this.props.route.path === '/user-info' || this.props.route.path === '/assessment/user-info'){
      form = (
        <form className="user-info-form">
          <label htmlFor="nickname">nickname</label>
          <input type="text" placeholder={store.session.get('firstName')} id="nickname" />
          <input type="submit" value="submit" id="submit-nickname"/>
          <input type="button" value="logout" id="logout-btn" onClick={this.logout}/>
        </form>
      );
    } else {
      form = (

      );
    }

    return(
      <div className="modal-container" style={containerStyles}>
        <div className="modal-content" style={contentStyles}>
          {this.props.children}
        </div>
      </div>
    );
  }
});
