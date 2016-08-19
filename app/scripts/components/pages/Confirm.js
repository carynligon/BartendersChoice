import React from 'react';
import {hashHistory} from 'react-router';

import store from '../../store';

export default React.createClass({
  proceed() {
    localStorage.setItem('ofAge', true);
    hashHistory.push('/');
  },
  alert() {
    alert('You must be 21 to view this site');
  },
  render() {
    return (
      <div className="confirm-page-wrapper">
        <div className="fullscreen-bg">
            <video loop muted autoPlay className="fullscreen-bg__video">
                <source src="assets/video/Cocktails.mp4" type="video/mp4"/>
            </video>
        </div>
        <div id="age-validation">
          <h1>ARE YOU OVER 21?</h1>
          <input type="button" id="yes-21" value="YES" onClick={this.proceed}/>
          <input type="button" id="no-21" value="NO" onClick={this.alert}/>
        </div>
      </div>
    );
  }
});
