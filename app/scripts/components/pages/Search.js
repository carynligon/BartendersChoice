import _ from 'underscore';
import React from 'react';
import {hashHistory} from 'react-router';

import store from '../../store';

import Nav from '../Nav';
import FilterBar from '../FilterBar';
import DrinkPreview from '../DrinkPreview';

export default React.createClass({
  getInitialState() {
    store.searchResults.getResults(this.props.params.searchQuery);
    return {
      results: ''
    }
  },
  viewRecipe(e) {
    hashHistory.push(`/recipe/${e.target.parentElement.parentElement.id}`);
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
  componentWillReceiveProps(nextProps) {
    store.searchResults.getResults(nextProps.params.searchQuery);
  },
  render() {
    let results;
    let reduced;
    if (this.state.results !== '') {
      reduced = this.state.results.reduce((rtsf, curr) => {
        let newObj = {};
        if (_.has(rtsf, curr.drinkName)) {
          console.log(rtsf);
          return rtsf;
        } else {
          rtsf[curr.drinkName] = curr;
          return rtsf;
        }
      },{});
      console.log(reduced);
      results = _.toArray(reduced).map((result, i) => {
        let styles;
        if (result.drink._obj.drink__strDrinkThumb !== null) {
          styles = {
            backgroundImage: 'url(' + result.drink._obj.drink__strDrinkThumb + ')'
          }
        } else {
          styles = {
            backgroundImage: 'url(assets/images/Cocktail-icon.png)'
          }
        }
        return (
          <li className="drink-preview" id={result.drink._obj._id} onClick={this.viewRecipe} key={i}>
          <div className="drink-img" style={styles}>
            <h4>{result.drink._obj.drink__strDrink}</h4>
          </div>
        </li>
      );
      });
    }
    return (
      <main id="search-results-page">
        <Nav/>
        <FilterBar/>
        <ul id="result-list">
          {results}
        </ul>
      </main>
    );
  }
});
