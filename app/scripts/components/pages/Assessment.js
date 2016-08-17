import React from 'react';

import Nav from '../Nav';

export default React.createClass({
  render() {
    return(
      <main className="assessment">
        <Nav/>
        {this.props.children}
      </main>
    );
  }
});
