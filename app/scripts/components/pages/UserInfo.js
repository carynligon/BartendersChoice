import React from 'react';

import store from '../../store';

import UserModal from '../UserModal';

export default React.createClass({
  logout() {
    store.session.logout();
  },
  render() {
    return(
      <UserModal>
        <h3>Hi {store.session.get('firstName')}!</h3>
        <input type="button" value="logout" id="logout-btn" onClick={this.logout}/>
      </UserModal>
    );
  }
});
