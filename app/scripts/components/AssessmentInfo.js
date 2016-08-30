import React from 'react';
import {hashHistory} from 'react-router';

import store from '../store';

import UserModal from './UserModal';
import Login from './pages/Login';
import Signup from './pages/Signup';

export default React.createClass({
  getInitialState() {
    return {loggedIn: true}
  },
  startAssessment() {
    if (localStorage.getItem('username') === 'Anonymous') {
      this.setState({loggedIn: false, login: true});
    } else {
      this.setState({loggedIn: true});
      store.assessment.newAssessment();
    }
  },
  showSignup() {
    this.setState({signup: true, login: false});
  },
  showLogin() {
    this.setState({signup: false, login: true});
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
    console.log(this.state);
    let login;
    if (!this.state.loggedIn && this.state.login) {
      login = (<UserModal hideModal={this.hideModal}><Login hideModal={this.hideModal} showSignup={this.showSignup}/></UserModal>);
    } else if (!this.state.loggedIn && this.state.signup) {
      login = (<UserModal hideModal={this.hideModal}><Signup hideModal={this.hideModal} showLogin={this.showLogin}/></UserModal>);
    }
    return(
      <section className="assessment-section">
        <h2>About this Assessment</h2>
        <div id="assessment-image" style={{backgroundImage:'url(assets/images/assessment-image.jpeg)'}}></div>
        <p className="assessment-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p className="assessment-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <input type="button" id="start-assessment-btn" value="Begin" onClick={this.startAssessment}/>
        {login}
        <div id="about-traitify">
          <img src="assets/images/traitify_logo.png" alt="Traitify(personality API) logo"/>
          <p className="assessment-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
        </div>
      </section>
    );
  }
});
