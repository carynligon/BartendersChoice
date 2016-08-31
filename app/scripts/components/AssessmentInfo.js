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
    if (store.slides.models.length === 49) {
      this.firstQuestion();
    }
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
        <p className="assessment-description">Traitify's Core Assessment measures overall elements of an individual’s personality, assessing a full range of characterological components in order to gain an overall picture of a person. The personality information derived from this assessment can be used to gain a general understanding of the user’s personality, or to match individual’s with other people.</p>
        <p className="assessment-description">Simply read each question/statement shown to you at the top of the page and select "ME" if you feel that your personality coorelates with that statement, otherwise select "NOT ME". At the end of this assessment, your results will be generated and you will be able to see your matched drink!</p>
        <input type="button" id="start-assessment-btn" value="Begin" onClick={this.startAssessment}/>
        {login}
        <div id="about-traitify">
          <a href="https://www.traitify.com/"><img src="assets/images/traitify_logo.png" alt="Traitify(personality API) logo"/></a>
          <p className="assessment-description">Traitify is the only visual personality assessment that can be completed in just minutes. Users simply swipe through a short series of images, answer "me" or "not me" and voilà: instant, actionable data!.</p>
        </div>
      </section>
    );
  }
});
