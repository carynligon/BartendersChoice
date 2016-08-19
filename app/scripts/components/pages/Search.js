import React from 'react';

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
  listener() {
    this.setState({results: store.searchResults.toJSON()})
  },
  componentDidMount() {
    store.searchResults.on('update', this.listener);
  },
  render() {
    console.log(this.state.results);
    let results;
    if (this.state.results !== '') {
      results = this.state.results.map((result, i) => {
        return (
          <li className="drink-preview" id={result.drink._obj._id} onClick={this.viewRecipe} key={i}>
          <div className="drink-img">
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
