import React from 'react';
import {Link} from 'react-router';

import store from '../store';

import UserModal from './UserModal';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';

export default React.createClass({
  getInitialState() {
    return {
      authtoken: localStorage.getItem('authtoken'),
      username: localStorage.getItem('username'),
      showFilter: false,
      showModal: false,
      login: true,
      showMenu: false,
    }
  },
  listener() {
    this.setState({
      authtoken: store.session.get('authtoken'),
      username: store.session.get('username'),
      showFilter: false
    });
  },
  logout() {
    store.session.logout();
  },
  showModal() {
    this.setState({showModal: true});
  },
  showSignup() {
    this.setState({signup: true, login: false});
  },
  showLogin() {
    this.setState({signup: false, login: true});
  },
  hideModal() {
    this.setState({showModal: false});
  },
  showFilter() {
    this.setState({showFilter: true});
  },
  hideFilter() {
    this.setState({showFilter: false})
  },
  showMenu() {
    this.setState({showMenu: !this.state.showMenu});
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
    let showFilter;
    let showModal;
    if (this.state.showModal && this.state.login) {
      showModal = (<Login hideModal={this.hideModal} showSignup={this.showSignup}/>);
    } else if (this.state.showModal && this.state.signup) {
      showModal = (<Signup hideModal={this.hideModal} showLogin={this.showLogin}/>);
    }
    if (this.state.username === 'Anonymous') {
      links = (
        <div id="login-links">
          <p onClick={this.showModal}>SIGN IN</p>
        </div>
      );
      } else {
        links = (
          <div id="login-links">
            <Link to="me" id="user-info-link"><i className="fa fa-user user-icon" aria-hidden="true"></i></Link>
            <Link to="custom" id="custom-link">+</Link>
          </div>
        );
      }
      if (this.state.showFilter) {
        showFilter = (<FilterBar hideFilter={this.hideFilter}/>);
      } else {
        showFilter;
      }
      let menu;
      if (this.state.showMenu && this.state.username !== 'Anonymous') {
        menu = (
          <ul id="mobile-menu">
            <li><Link to="me">Dashboard</Link></li>
            <li><Link to="custom">Add Recipe</Link></li>
            <li><Link to="assessment">Assessment</Link></li>
            <li><p id="logout-dropdown" onClick={this.logout}>Logout</p></li>
          </ul>
        );
      } else if (this.state.showMenu && this.state.username === 'Anonymous'){
        menu = (
          <ul id="mobile-menu">
          <li><p id="signin-btn" onClick={this.showModal}>Sign in</p></li>
          <li><Link to="assessment">Assessment</Link></li>
        </ul>
      );
    }
    return(
      <nav>
        <SearchBar hideFilter={this.hideFilter}/>
        <i className="fa fa-search" id="search-icon" aria-hidden="true"></i>
        <button id="show-filter-options" onClick={this.showFilter}>
          <i className="fa fa-filter filter-icon" aria-hidden="true"></i>
        </button>
        <Link id="logo" to="/"><img src="assets/images/logo.png"/></Link>
        {links}
        {showFilter}
        {showModal}
        <i className="fa fa-bars menu-icon" aria-hidden="true" onClick={this.showMenu}></i>
        {menu}
      </nav>
    );
  }
});
