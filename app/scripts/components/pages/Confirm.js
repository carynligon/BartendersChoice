import React from 'react';
import {hashHistory} from 'react-router';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return {
      mobList: false,
      dobList: false,
      yobList: false
    }
  },
  dropdownMob() {
    this.setState({
      mobList: !this.state.mobList
    });
  },
  dropdownDob() {
    this.setState({
      dobList: !this.state.dobList
    });
  },
  dropdownYob() {
    this.setState({
      yobList: !this.state.yobList
    });
  },
  selectDate(e) {
    e.target.parentElement.firstChild.innerText = e.target.innerText;
  },
  validateAge(e) {
    e.preventDefault();
    let month = document.getElementById('mobList').firstChild.innerText;
    let day = document.getElementById('dobList').firstChild.innerText;
    let year = document.getElementById('yobList').firstChild.innerText;
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let currDate = new Date();
    console.log(currDate.getFullYear());
    let age = currDate.getFullYear() - year;
    let monthDiff = currDate.getMonth() - months.indexOf(month);
    if (monthDiff < 0 || (monthDiff === 0 && currDate.getDate() < day)) {
      age--;
    }
    if (age >= 21) {
      store.session.set({
        age
      });
      hashHistory.push('/');
    } else {
      alert('You must be 21 to view this site');
    }
  },
  render() {
    let stylesMob;
    let stylesDob;
    let stylesYob;
    if (this.state.mobList === false) {stylesMob = {display: 'none'}} else {stylesMob = {display: 'block'}}
    if (this.state.dobList === false) {stylesDob = {display: 'none'}} else {stylesDob = {display: 'block'}}
    if (this.state.yobList === false) {stylesYob = {display: 'none'}} else {stylesYob = {display: 'block'}}

    let mobArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let months = mobArr.map((month,i) => {
      return <li style={stylesMob} key={i} onClick={this.selectDate}>{month}</li>;
    });

    let dobArr = [];
    for (var i = 1; i < 32; i++) {
      dobArr.push(i);
    }
    let days = dobArr.map((day,i) => {
      return <li style={stylesDob} key={i} onClick={this.selectDate}>{day}</li>;
    });

    let yobArr = [];
    for (var i = new Date().getFullYear(); i > 1919; i--) {
      yobArr.push(i);
    }
    let years = yobArr.map((year,i) => {
      return <li style={stylesYob} key={i} onClick={this.selectDate}>{year}</li>;
    });
    return (
      <div className="confirm-page-wrapper">
        <div className="fullscreen-bg">
            <video loop muted autoPlay className="fullscreen-bg__video">
                <source src="assets/video/Cocktails.mp4" type="video/mp4"/>
            </video>
        </div>
        <form id="confirm-birthdate-form" onSubmit={this.validateAge}>
          <div id="mob-dropdown" onClick={this.dropdownMob}>
            <ul id="mobList">
              <li>Month</li>
              {months}
            </ul>
          </div>
          <div id="dob-dropdown" onClick={this.dropdownDob}>
            <ul id="dobList">
              <li>Day</li>
              {days}
            </ul>
          </div>
          <div id="yob-dropdown" onClick={this.dropdownYob}>
            <ul id="yobList">
              <li>Year</li>
              {years}
            </ul>
          </div>
          <input type="submit" id="submit-birthdate-btn" value="submit"/>
        </form>
        <footer>
        <p>Learn, make, enjoy responsibly</p>
        </footer>
      </div>
    );
  }
});
