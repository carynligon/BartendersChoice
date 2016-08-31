import _ from 'underscore';
import React from 'react';
import {hashHistory} from 'react-router';

import store from '../../store';

import Nav from '../Nav';
import FilterBar from '../FilterBar';
import DrinkPreview from '../DrinkPreview';

export default React.createClass({
  getInitialState() {
    return {
      results: ''
    }
  },
  viewRecipe(e) {
    hashHistory.push(`/recipe/${e.target.parentElement.parentElement.id}`);
  },
  listener() {
    this.setState({results: store.searchResults.toJSON()});
  },
  componentDidMount() {
    store.searchResults.on('update', this.listener);
    let filterArr = this.props.location.query.filter;
    let searchString = this.props.location.query.q;
    store.searchResults.getResults(searchString, filterArr);
  },
  componentWillUnmount() {
    store.searchResults.off('update', this.listener);
  },
  componentWillReceiveProps(nextProps) {
    store.searchResults.getResults(nextProps.location.query.q, this.props.location.query.filter);
  },
  render() {
    let results;
    let reduced;
    let noResultsMsg;
    if (this.state.results !== '') {
      reduced = this.state.results.reduce((rtsf, curr) => {
        let newObj = {};
        if (_.has(rtsf, curr.drinkName)) {
          return rtsf;
        } else {
          rtsf[curr.drinkName] = curr;
          return rtsf;
        }
      },{});
      results = _.toArray(reduced).map((result, i) => {
        return (
          <DrinkPreview id={result.drink._obj._id} img={result.drink._obj.drink__strDrinkThumb} name={result.drink._obj.drink__strDrink} key={i}/>
        )
      });
      if (this.state.results.length === 0) {
        noResultsMsg = (<p id="no-results">We didn't find any matching results. Try removing filters to get more results.</p>)
      }
    }
    return (
      <main id="search-results-page">
        <Nav/>
        <ul id="result-list">
          {results}
          {noResultsMsg}
        </ul>
      </main>
    );
  }
});
