import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render() {
    return(
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/assessment">Assessment</Link>
          Login
          Signup
        </nav>
      </header>
    );
  }
});
