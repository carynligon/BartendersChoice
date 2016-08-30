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
    store.session.login(username, password).then((response) => {
      if (response) {
        console.log(response);
        this.props.hideModal();
      } else {
        this.setState({error: true});
      }
    });
  },
  showSignup() {
    this.setState({content: 'signup'});
  },
  showLogin() {
    this.setState({content: 'login'});
  },
  render() {
    console.log(this.state);
    let styles;
    let errorMsg;
    if (this.state.error) {
      styles = {
        background: '#FF3C38',
        color: '#fff'
      };
      errorMsg = (<p id="login-error">invalid username or password</p>);
    }
    return(
      <UserModal hideModal={this.props.hideModal}>
      <form className="login-signup-form" onSubmit={this.login}>
        <h2 className="login-title">SIGN IN</h2>
        <div className="username">
          <label htmlFor="username"><i className="fa fa-user user-icon" aria-hidden="true"></i></label>
          <input type="text" placeholder="username" id="username" ref="username" style={styles}/>
        </div>
        <div className="password">
          <label htmlFor="password"><i className="fa fa-unlock-alt password-icon" aria-hidden="true"></i></label>
          <input type="password" placeholder="password" id="password" ref="password" style={styles}/>
        </div>
        {errorMsg}
        <button type="submit" value="submit" id="submit-login-btn">submit</button>
        <p>Don't have an account?<span id="signup-btn" onClick={this.props.showSignup}>Sign up!</span></p>
      </form>
      </UserModal>
    );
  }
});
