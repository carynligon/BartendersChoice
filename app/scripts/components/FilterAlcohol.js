import React from 'react';
import {hashHistory} from 'react-router';

export default React.createClass({
  filterAlcohol(e) {
    // let alcohol = e.target.id;
    // if (document.getElementById('search-input').value !== '') {
    //   hashHistory.push({
    //     pathname: 'search',
    //     query: {
    //       q: document.getElementById('search-input').value,
    //       filter: [alcohol]
    //     }
    //   });
    // } else {
    //   hashHistory.push({
    //     pathname: 'search',
    //     query: {filter: [alcohol]}
    //   });
    // }
  },
  render() {
    return (
      <div id="filter-alcohol-wrapper">
        <h6>Alcohol</h6>
        <ul id="alcohol-list-1">
          <li>
            <input type="radio" id="bourbon" onChange={this.filterAlcohol}/>
            <label htmlFor="bourbon">Bourbon</label>
          </li>
          <li>
            <input type="radio" id="rye" onChange={this.filterAlcohol}/>
            <label htmlFor="rye">Rye</label>
          </li>
          <li>
            <input type="radio" id="tequila" onChange={this.filterAlcohol}/>
            <label htmlFor="tequila">Tequila</label>
          </li>
        </ul>
        <ul id="alcohol-list-2">
          <li>
            <input type="radio" id="gin" onChange={this.filterAlcohol}/>
            <label htmlFor="gin">Gin</label>
          </li>
          <li>
            <input type="radio" id="vodka" onChange={this.filterAlcohol}/>
            <label htmlFor="vodka">Vodka</label>
          </li>
          <li>
            <input type="radio" id="scotch" onChange={this.filterAlcohol}/>
            <label htmlFor="scotch">Scotch</label>
          </li>
        </ul>
      </div>
    );
  }
});
