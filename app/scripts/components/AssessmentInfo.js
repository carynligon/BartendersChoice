import React from 'react';
import {hashHistory} from 'react-router';

import store from '../store';

export default React.createClass({
  startAssessment() {
    if (store.session.get('username') === 'Anonymous') {
      hashHistory.push('/assessment/login');
    } else {
      store.assessment.newAssessment();
    }
  },
  render() {
    return(
      <section className="assessment-section">
        <h2>About this Assessment</h2>
        <img src="assets/images/traitify_logo.png" alt="Traitify(personality API) logo"/>
        <p className="assessment-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p className="assessment-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <input type="button" id="start-assessment-btn" value="Begin" onClick={this.startAssessment}/>
      </section>
    );
  }
});
