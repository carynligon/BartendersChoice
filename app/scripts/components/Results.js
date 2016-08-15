import React from 'react';

import store from '../store';

export default React.createClass({
  render() {
    store.slides.sendAnswers(store.session.get('assessment_id'))
    console.log(store.slides);
    return (
      <div></div>
    );
  }
});
