import React from 'react';

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
  render() {
    let stylesMob;
    let stylesDob;
    let stylesYob;
    if (this.state.mobList === false) {stylesMob = {display: 'none'}} else {stylesMob = {display: 'block'}}
    if (this.state.dobList === false) {stylesDob = {display: 'none'}} else {stylesDob = {display: 'block'}}
    if (this.state.yobList === false) {stylesYob = {display: 'none'}} else {stylesYob = {display: 'block'}}

    let dobArr = [];
    for (var i = 1; i < 32; i++) {
      dobArr.push(i);
    }
    let days = dobArr.map((day,i) => {
      return <li style={stylesDob} key={i}>{day}</li>;
    });

    let mobArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let months = mobArr.map((month,i) => {
      return <li style={stylesMob} key={i}>{month}</li>;
    });

    let yobArr = [];
    for (var i = new Date().getFullYear(); i > 1919; i--) {
      yobArr.push(i);
    }
    let years = yobArr.map((year,i) => {
      return <li style={stylesYob} key={i}>{year}</li>;
    });
    return (
      <div className="confirm-page-wrapper">
        <div className="fullscreen-bg">
            <video loop muted autoPlay className="fullscreen-bg__video">
                <source src="assets/video/Cocktails.mp4" type="video/mp4"/>
            </video>
        </div>
        <form id="confirm-birthdate-form">
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
