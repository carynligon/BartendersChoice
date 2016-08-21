import React from 'react';

export default React.createClass({
  render() {
    return (
      <div id="filter-flavor-wrapper">
        <h6>Flavor Profile</h6>
        <ul id="flavor-profile-1">
          <li>
            <input type="checkbox" id="filter-sweet"/>
            <label htmlFor="filter-sweet">Sweet</label>
          </li>
          <li>
            <input type="checkbox" id="filter-sour"/>
            <label htmlFor="filter-sour">Sour</label>
          </li>
          <li>
            <input type="checkbox" id="filter-salty"/>
            <label htmlFor="filter-salty">Salty</label>
          </li>
          <li>
            <input type="checkbox" id="filter-spirit-forward"/>
            <label htmlFor="filter-spirit-forward">Spirit-forward</label>
          </li>
          <li>
            <input type="checkbox" id="filter-bitter"/>
            <label htmlFor="filter-bitter">Bitter</label>
          </li>
        </ul>
        <ul id="flavor-profile-2">
          <li>
            <input type="checkbox" id="filter-bubbly"/>
            <label htmlFor="filter-bubbly">Bubbly</label>
          </li>
          <li>
            <input type="checkbox" id="filter-fruity"/>
            <label htmlFor="filter-fruity">Fruity</label>
          </li>
          <li>
            <input type="checkbox" id="filter-creamy"/>
            <label htmlFor="filter-creamy">Creamy</label>
          </li>
          <li>
            <input type="checkbox" id="filter-spicy"/>
            <label htmlFor="filter-spicy">Spicy</label>
          </li>
          <li>
            <input type="checkbox" id="filter-dry"/>
            <label htmlFor="filter-dry">Dry</label>
          </li>
        </ul>
      </div>
    );
  }
});
