import React from 'react';
import {hashHistory} from 'react-router';

import store from '../store';

import UserModal from './UserModal';
import Login from './pages/Login';

export default React.createClass({
  getInitialState() {
    return {loggedIn: true}
  },
  startAssessment() {
    if (localStorage.getItem('username') === 'Anonymous') {
      this.setState({loggedIn: false});
    } else {
      this.setState({loggedIn: true});
      store.assessment.newAssessment();
    }
  },
  hideModal() {
    this.setState({loggedIn: true});
  },
  firstQuestion() {
    if (store.slides.models.length === 49) {
      hashHistory.push(`/assessment/question/${store.slides.models[0].get('id')}`);
    }
  },
  componentDidMount() {
    store.slides.on('update', this.firstQuestion);
  },
  render() {
    let login;
    if (!this.state.loggedIn) {
      login = (<UserModal hideModal={this.hideModal}><Login hideModal={this.hideModal}/></UserModal>);
    }
    return(
      <section className="assessment-section">
        <h2>About this Assessment</h2>
        <img src="assets/images/traitify_logo.png" alt="Traitify(personality API) logo"/>
        <p className="assessment-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p className="assessment-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <input type="button" id="start-assessment-btn" value="Begin" onClick={this.startAssessment}/>
        {login}
      </section>
    );
  }
});
