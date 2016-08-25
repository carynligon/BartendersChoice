import React from 'react';

import store from '../../store';
import Nav from '../Nav';

export default React.createClass({
  logout() {
    store.session.logout();
  },
  render() {
    return (
      <main id="dashboard-page">
        <Nav/>
        <ul id="select-view">
          <li>All</li>
          <li>Saved</li>
          <li>Favorites</li>
        </ul>
        <input type="button" value="logout" id="logout-btn" onClick={this.logout}/>
      </main>
    );
  }
});
