import React from 'react';
import {Link} from 'react-router';

import LoginModal from './LoginModal';

export default React.createClass({
  render() {
    return(
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/assessment">Assessment</Link>
          <Link to="/login">Login</Link>
          Signup
        </nav>
      </header>
    );
  }
});
