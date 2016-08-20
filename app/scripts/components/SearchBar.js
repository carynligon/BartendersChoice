import $ from 'jquery';
import React from 'react';
import {hashHistory} from 'react-router';

import store from '../store';
import settings from '../settings';

import DrinkPreview from './DrinkPreview';

export default React.createClass({
  getInitialState() {
    return {results:''};
  },
  routeToRecipe(e) {
    if (e.target.parentElement.id !== 'results-dropdown') {
      this.setState({results: ''});
      hashHistory.push(`/recipe/${e.target.parentElement.id}`);
    }
  },
  performSearch(e) {
    e.preventDefault();
    hashHistory.push(`/search/${this.refs.searchQuery.value}`);
  },
  render() {
    let styles;
    if (this.state.results !== '') {
      styles = {
        height: '240px'
      };
      window.addEventListener('click', (e) => {
        console.dir(e.target);
        if (e.target.tagName !== 'H6') {
          this.setState({results:''});
        }
      });
    }
    return(
      <form id="search-bar-form" onSubmit={this.performSearch} autoComplete="off">
        <input type="text" id="search-input" onKeyUp={this.performSearch} placeholder="search..." ref="searchQuery"/>
        <button id="search-icon-btn" onClick={this.performSearch}>
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
          <ul id="results-dropdown" style={styles}>
            {this.state.results}
          </ul>
      </form>
    );
  }
});
