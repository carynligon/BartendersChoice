import React from 'react';
import {Link} from 'react-router';

import store from '../store';

import UserModal from './UserModal';
import SearchBar from './SearchBar';

export default React.createClass({
  getInitialState() {
    return {
      authtoken: localStorage.getItem('authtoken'),
      username: localStorage.getItem('username')
    }
  },
  listener() {
    this.setState({
      authtoken: store.session.get('authtoken'),
      username: store.session.get('username')
    });
  },
  componentDidMount() {
    store.session.get();
    store.session.on('change add update remove', this.listener);
  },
  componentWillUnmount() {
    store.session.off('change add update remove', this.listener);
  },
  render() {
    console.log(this.state);
    let links;
      if (this.state.username === 'Anonymous') {
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
