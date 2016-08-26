import React from 'react';
import {Link, hashHistory} from 'react-router';

import Nav from '../Nav';

export default React.createClass({
  goHome() {
    hashHistory.push('/');
  },
  render() {
    return (
      <main id="oops-page">
        <Nav/>
        <h2>Oops!</h2>
        <img id="oops-img" src="assets/images/oops.png"/>
        <input type="button" id="safety-btn" value="BACK TO SAFETY" onClick={this.goHome}/>
      </main>
    );
  }
});
