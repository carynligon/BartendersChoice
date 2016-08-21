import _ from 'underscore';
import $ from 'jquery';
import React from 'react';
import {hashHistory} from 'react-router';

import store from '../store';
import settings from '../settings';

import DrinkPreview from './DrinkPreview';

export default React.createClass({
  getInitialState() {
    return {results: ''}
  },
  routeToRecipe(e) {
    if (e.target.parentElement.id !== 'results-dropdown') {
      this.setState({results: ''});
      hashHistory.push(`/recipe/${e.target.parentElement.id}`);
    }
  },
  performSearch(e) {
    e.preventDefault();
    let searchString = this.refs.searchQuery.value;
    if (e.which === 13) {
      this.toSearchResults();
    } else {
      if (searchString.length >= 3) {
        store.searchResults.getResults(searchString);
      }
    }
  },
  toSearchResults() {
    hashHistory.push(`/search/${this.refs.searchQuery.value}`);
  },
  listener() {
    this.setState({results: store.searchResults.toJSON()})
  },
  componentDidMount() {
    store.searchResults.on('update', this.listener);
  },
  componentWillUnmount() {
    store.searchResults.off('update', this.listener);
  },
  render() {
    console.log(this.state);
    let styles;
    let reduced;
    let results;
    if (this.state.results) {
      if (this.state.results.length >= 1) {
        styles = {
          height: '120px'
        };
      reduced = this.state.results.reduce((rtsf, curr) => {
        if (_.has(rtsf, curr.drinkName)) {
          console.log(rtsf);
          return rtsf;
        } else {
          rtsf[curr.drinkName] = curr;
          return rtsf;
        }
      },{});
        results = _.toArray(reduced).map((drink, i) => {
          console.log(drink.drink._obj.drink__strDrink);
          return (
            <li key={i} onClick={this.routeToRecipe} id={drink.drink._obj._id}>
              <h6>{drink.drink._obj.drink__strDrink}</h6>
            </li>
          );
        });
      }
    }
    return(
      <form id="search-bar-form" autoComplete="off">
        <input type="text" id="search-input" onKeyUp={this.performSearch} placeholder="SEARCH RECIPES..." ref="searchQuery"/>
        <button id="search-icon-btn" onClick={this.performSearch}>
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
          <ul id="results-dropdown" style={styles}>
            {results}
          </ul>
      </form>
    );
  }
});
