import React from 'react';

export default React.createClass({
  render() {
    return (
      <div id="filter-difficulty-wrapper">
        <h6>Difficulty</h6>
        <input type="range" min="1" max="3" value="2"/>
      </div>
    );
  }
});
