import React from 'react';

import store from '../store';

export default React.createClass({
  render() {
    console.log(store.slides);
    return(
      <div></div>
    );
  }
});
