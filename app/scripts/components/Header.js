import React from 'react';
import {Link} from 'react-router';

import Nav from './Nav';

export default React.createClass({
  render() {
    return (
      <header>
        <Nav/>
        <h1>Bartender's Choice</h1>
        <h2>Where Mixology Meets Psychology</h2>
        <Link to="/assessment" id="assessment-link">Find your new drink</Link>
      </header>
    );
  }
});
