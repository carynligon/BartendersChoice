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
        <form className="user-info-form">
          <label htmlFor="nickname">nickname</label>
          <input type="text" placeholder={store.session.get('firstName')} id="nickname" />
          <input type="submit" value="submit" id="submit-nickname"/>
          <input type="button" value="logout" id="logout-btn" onClick={this.logout}/>
        </form>
      </UserModal>
    );
  }
});
