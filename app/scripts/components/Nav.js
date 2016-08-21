import React from 'react';
import {Link} from 'react-router';

import store from '../store';

import UserModal from './UserModal';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';

export default React.createClass({
  getInitialState() {
    return {
      authtoken: localStorage.getItem('authtoken'),
      username: localStorage.getItem('username'),
      showFilter: false
    }
  },
  listener() {
    this.setState({
      authtoken: store.session.get('authtoken'),
      username: store.session.get('username'),
      showFilter: false
    });
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
      if (this.state.showFilter) {
        showFilter = (<FilterBar/>);
      } else {
        showFilter;
      }
    return(
      <header>
        <nav>
          <SearchBar/>
          <button id="show-filter-options" onClick={this.showFilter}>
            <i className="fa fa-filter filter-icon" aria-hidden="true"></i>
          </button>
          <Link to="/">Home</Link>
          <Link to="/assessment">Assessment</Link>
          {links}
        </nav>
        {showFilter}
      </header>
    );
  }
});
