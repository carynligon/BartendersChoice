import React from 'react';

export default React.createClass({
  render() {
    return (
      <div id="filter-flavor-wrapper">
        <h6>Flavor Profile</h6>
        <ul id="flavor-profile-1">
          <li>
            <input type="checkbox" id="sweet"/>
            <label htmlFor="filter-sweet">Sweet</label>
          </li>
          <li>
            <input type="checkbox" id="sour"/>
            <label htmlFor="filter-sour">Sour</label>
          </li>
          <li>
            <input type="checkbox" id="salty"/>
            <label htmlFor="filter-salty">Salty</label>
          </li>
          <li>
            <input type="checkbox" id="spirit-forward"/>
            <label htmlFor="filter-spirit-forward">Spirit-forward</label>
          </li>
          <li>
            <input type="checkbox" id="bitter"/>
            <label htmlFor="filter-bitter">Bitter</label>
          </li>
        </ul>
        <ul id="flavor-profile-2">
          <li>
            <input type="checkbox" id="bubbly"/>
            <label htmlFor="filter-bubbly">Bubbly</label>
          </li>
          <li>
            <input type="checkbox" id="fruity"/>
            <label htmlFor="filter-fruity">Fruity</label>
          </li>
          <li>
            <input type="checkbox" id="creamy"/>
            <label htmlFor="filter-creamy">Creamy</label>
          </li>
          <li>
            <input type="checkbox" id="spicy"/>
            <label htmlFor="filter-spicy">Spicy</label>
          </li>
          <li>
            <input type="checkbox" id="dry"/>
            <label htmlFor="filter-dry">Dry</label>
          </li>
        </ul>
      </div>
    );
  }
});
