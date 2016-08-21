import React from 'react';

export default React.createClass({
  render() {
    return (
      <div id="filter-alcohol-wrapper">
        <h6>Alcohol</h6>
        <ul id="alcohol-list-1">
          <li>
            <input type="radio" id="bourbon"/>
            <label htmlFor="bourbon">Bourbon</label>
          </li>
          <li>
            <input type="radio" id="rye"/>
            <label htmlFor="rye">Rye</label>
          </li>
          <li>
            <input type="radio" id="tequila"/>
            <label htmlFor="tequila">Tequila</label>
          </li>
        </ul>
        <ul id="alcohol-list-2">
          <li>
            <input type="radio" id="gin"/>
            <label htmlFor="gin">Gin</label>
          </li>
          <li>
            <input type="radio" id="vodka"/>
            <label htmlFor="vodka">Vodka</label>
          </li>
          <li>
            <input type="radio" id="other-alcohol"/>
            <label htmlFor="other-alcohol">Other</label>
          </li>
        </ul>
      </div>
    );
  }
});
