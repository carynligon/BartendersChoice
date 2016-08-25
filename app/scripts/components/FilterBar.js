import React from 'react';
import {hashHistory} from 'react-router';

import FilterFlavor from './FilterFlavor';
import FilterDifficulty from './FilterDifficulty';
import FilterAlcohol from './FilterAlcohol';

export default React.createClass({
  filterResults() {
    let filterArr = [];
    document.querySelectorAll('input').forEach((filter) => {
      if (filter.type === 'checkbox' | filter.type === 'radio') {
        if (filter.checked === true) {
          filterArr.push(filter.id);
        }
      } else if (filter.type === 'range') {
        filterArr.push(filter.value);
      }
    });
    hashHistory.push({
      pathname: 'search',
      query: {
        q: document.getElementById('search-input').value,
        filter: filterArr
    }
  });
  this.props.showFilter();
  },
  render() {
    return(
      <div id="filter-bar">
        <FilterFlavor/>
        <FilterDifficulty/>
        <FilterAlcohol/>
        <input type="button" id="submit-filters" onClick={this.filterResults} value="search"/>
      </div>
    );
  }
});
