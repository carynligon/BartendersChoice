import React from 'react';
import {Link} from 'react-router';

import store from '../store';

import LoginModal from './LoginModal';

export default React.createClass({
  getInitialState() {
    if (!localStorage.getItem('authtoken')) {
      return {loggedIn: false}
    } else {
      return {loggedIn: true}
    }
  },
  logout() {
    store.session.logout();
    this.setState({
      loggedIn: false
    });
  },
  render() {
    let links;
    if (this.state.loggedIn === false) {
      links = (
        <div id="login-links">
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      );
    } else {
      links = (
        <div id="login-links">
          <input type="button" value="Logout" id="logout-btn" onClick={this.logout}/>
        </div>
      );
    }
    return(
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/assessment">Assessment</Link>
          {links}
        </nav>
      </header>
    );
  }
});
