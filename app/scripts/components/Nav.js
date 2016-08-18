import React from 'react';
import {Link} from 'react-router';

import store from '../store';

import UserModal from './UserModal';
import SearchBar from './SearchBar';

export default React.createClass({
  getInitialState() {
    if (!localStorage.getItem('authtoken')) {
      return {loggedIn: false}
    } else {
      if (localStorage.getItem('username') === 'Anonymous') {
        return {loggedIn: false}
      } else {
        return {loggedIn: true}
      }
    }
  },
  listener() {
    if (localStorage.getItem('username') === 'Anonymous') {
      this.setState({loggedIn: false});
    } else {
      this.setState({loggedIn: true});
    }
  },
  componentDidMount() {
    store.session.on('change add update', this.listener);
  },
  componentWillUnmount() {
    store.session.off('change add update remove', this.listener);
  },
  render() {
    let links;
    console.log(this.state.loggedIn + ' ' + store.session);
      if (this.state.loggedIn === false) {
        links = (
          <div id="login-links">
            <Link to="login">SIGN IN</Link>
          </div>
        );
      } else {
        links = (
          <div id="login-links">
            <Link to="user-info" id="user-info-link"><i className="fa fa-user user-icon" aria-hidden="true"></i></Link>
          </div>
        );
      }
    return(
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/assessment">Assessment</Link>
          <SearchBar/>
          {links}
        </nav>
      </header>
    );
  }
});
