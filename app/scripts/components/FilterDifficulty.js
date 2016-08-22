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
      hashHistory.push({
        pathname: 'search',
        query: {
          q: document.getElementById('search-input').value,
          filter: [difficulty]
        }
      });
    } else {
      hashHistory.push({
        pathname: 'search',
        query: {filter: [difficulty]}
      });
    }
  },
  render() {
    return (
      <div id="filter-difficulty-wrapper">
        <h6>Difficulty</h6>
        <input type="range" min="1" max="3" onClick={this.FilterDifficulty} ref='difficulty'/>
      </div>
    );
  }
});
