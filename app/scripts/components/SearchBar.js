import React from 'react';

export default React.createClass({
  render() {
    return(
      <div id="search-bar-container">
        <input type="text" id="search-input" placeholder="search..." ref="searchQuery"/>
        <button id="search-icon-btn">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
    );
  }
});
