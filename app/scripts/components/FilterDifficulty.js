import React from 'react';
import {hashHistory} from 'react-router';

export default React.createClass({
  FilterDifficulty() {
    console.log('changed slider');
    let difficulty;
    if (this.refs.difficulty.value === '3') {
      difficulty = 'difficult'
    } else if (this.refs.difficulty.value === '2') {
      difficulty = 'medium'
    } else {
      difficulty = 'easy'
    }
    if (document.getElementById('search-input').value !== '') {
      hashHistory.push(`/search/${document.getElementById('search-input').value}+${difficulty}`);
    } else {
      hashHistory.push(`/search/x+${difficulty}`);
    }
  },
  render() {
    return (
      <div id="filter-difficulty-wrapper">
        <h6>Difficulty</h6>
        <input type="range" min="1" max="3" onChange={this.FilterDifficulty} ref='difficulty'/>
      </div>
    );
  }
});
