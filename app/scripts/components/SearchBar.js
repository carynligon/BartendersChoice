import _ from 'underscore';
import $ from 'jquery';
import React from 'react';
import {hashHistory} from 'react-router';

import store from '../store';
import settings from '../settings';

import DrinkPreview from './DrinkPreview';

export default React.createClass({
  getInitialState() {
    return {hide: true};
  },
  routeToRecipe(e) {
    if (e.target.parentElement.id !== 'results-dropdown') {
      hashHistory.push(`/recipe/${e.target.parentElement.id}`);
    }
  },
  performSearch(e) {
    e.preventDefault();
    let searchString = this.refs.searchQuery.value;
    if (e.which === 13) {
      this.setState({hide: true});
      this.toSearchResults();
    } else {
      if (searchString.length >= 3) {
        this.setState({hide: false});
        store.searchResults.getResults(searchString);
      }
    }
  },
  toSearchResults() {
    hashHistory.push({
      pathname: 'search',
      query: {q: this.refs.searchQuery.value}
    })
  },
  listener() {
    this.setState({results: store.searchResults.toJSON()})
  },
  listenToClicks(e) {
    if (e.target.id !== 'results-dropdown' && e.target.id !== 'search-input') {
      if (!this.state.hide) {
        this.setState({hide: true});
      }
    }
  },
  componentDidMount() {
    store.searchResults.on('update', this.listener);
    document.querySelector('body').addEventListener('click', this.listenToClicks);
  },
  componentWillUnmount() {
    store.searchResults.off('update', this.listener);
    document.querySelector('body').removeEventListener('click', this.listenToClicks);
  },
  render() {
    let styles;
    let reduced;
    let results;
    if (this.state.hide) {
      styles = {
        height: '0px'
      };
    } else {
      styles = {
        height: '200px'
      };
    }
    if (this.state.results) {
      if (this.state.results.length >= 1) {
      reduced = this.state.results.reduce((rtsf, curr) => {
        if (_.has(rtsf, curr.drinkName)) {
          return rtsf;
        } else {
          rtsf[curr.drinkName] = curr;
          return rtsf;
        }
      },{});
        results = _.toArray(reduced).map((drink, i) => {
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
