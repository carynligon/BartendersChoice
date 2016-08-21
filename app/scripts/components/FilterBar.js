import React from 'react';

import FilterFlavor from './FilterFlavor';
import FilterDifficulty from './FilterDifficulty';
import FilterAlcohol from './FilterAlcohol';

export default React.createClass({
  render() {
    return(
      <div id="filter-bar">
        <FilterFlavor/>
        <FilterDifficulty/>
        <FilterAlcohol/>
      </div>
    );
  }
});
