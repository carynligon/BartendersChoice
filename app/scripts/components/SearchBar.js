import $ from 'jquery';
import React from 'react';

import store from '../store';
import settings from '../settings';

export default React.createClass({
  performSearch(e) {
    e.preventDefault();
    let searchString = this.refs.searchQuery.value.toLowerCase();
    $.ajax({
      url: `https://baas.kinvey.com/appdata/${settings.appKey}/Ingredients`,
      data: {query: JSON.stringify({"ingredient":{"$regex":("^.+"+searchString)+"|"+("^"+searchString)}})},
      success: (data) => {
        data.forEach((ingredient) => {
          console.log(ingredient._id);
          $.ajax({
            url: `https://baas.kinvey.com/appdata/${settings.appKey}/drinkIngredients`,
            data: {
              query: JSON.stringify({"ingredient._id":"57b60628d7794fef762dbc68"}),
              resolve: 'drink'
            },
            success: (data) => {
              console.log(data);
              data.map((drink) => {
                console.log(drink.drink._obj.drink__strDrink);
              });
            }
          });
        });
      }
    });
  },
  render() {
    return(
      <form id="search-bar-form" onSubmit={this.performSearch}>
        <input type="text" id="search-input" placeholder="search..." ref="searchQuery"/>
        <button id="search-icon-btn" onClick={this.performSearch}>
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </form>
    );
  }
});
