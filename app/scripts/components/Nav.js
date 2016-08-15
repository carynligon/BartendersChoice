import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render() {
    return(
      <nav>
        Home
        <Link to="/assessment">Assessment</Link>
        +
        Logout
      </nav>
    );
  }
});
