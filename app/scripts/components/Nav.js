import React from 'react';
import {Link} from 'react-router';

import store from '../store';

import UserModal from './UserModal';
import Login from './pages/Login';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';

export default React.createClass({
  getInitialState() {
    return {
      authtoken: localStorage.getItem('authtoken'),
      username: localStorage.getItem('username'),
      showFilter: false,
      showModal: false,
      login: true
    }
  },
  listener() {
    this.setState({
      authtoken: store.session.get('authtoken'),
      username: store.session.get('username'),
      showFilter: false
    });
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
    this.setState({
      showFilter: !this.state.showFilter
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
    let links;
    let showFilter;
    let showModal;
    if (this.state.showModal && this.state.login) {
      showModal = (<UserModal hideModal={this.hideModal} showModal={this.showModal} login={true}><Login hideModal={this.hideModal}/></UserModal>);
    } else if (this.state.showModal && this.state.sigup) {
      showModal = (<UserModal hideModal={this.hideModal} showModal={this.showModal} login={false}><Signup/></UserModal>);
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
        showFilter = (<FilterBar/>);
      } else {
        showFilter;
      }
    return(
      <nav>
        <SearchBar/>
        <button id="show-filter-options" onClick={this.showFilter}>
          <i className="fa fa-filter filter-icon" aria-hidden="true"></i>
        </button>
        <Link id="logo" to="/"><img src="assets/images/logo.png"/></Link>
        {links}
        {showFilter}
        {showModal}
      </nav>
    );
  }
});
