import React from 'react';
import {hashHistory} from 'react-router';

export default React.createClass({
  FilterDifficulty() {
    let difficulty;
    if (this.refs.difficulty.value === '3') {
      difficulty = 'difficult'
    } else if (this.refs.difficulty.value === '2') {
      difficulty = 'medium'
    } else {
      difficulty = 'easy'
    }
    if (this.props.params.location.filter) {
      if (document.getElementById('search-input').value !== '') {
        hashHistory.push({
          pathname: 'search',
          query: {
            q: document.getElementById('search-input').value,
            filter: this.props.params.location.filter.push(difficulty)
          }
        });
      } else {
        hashHistory.push({
          pathname: 'search',
          query: {filter: this.props.params.location.filter.push(difficulty)}
        });
      }
    } else {
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
    }
  },
  render() {
    return (
      <div id="filter-difficulty-wrapper">
        <h6>Difficulty</h6>
        <input type="range" min="1" max="3" ref='difficulty'/>
      </div>
    );
  }
});
