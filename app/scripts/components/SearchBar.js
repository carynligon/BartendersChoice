import $ from 'jquery';
import React from 'react';
import {hashHistory} from 'react-router';

import store from '../store';
import settings from '../settings';

export default React.createClass({
  getInitialState() {
    return {results:''};
  },
  routeToRecipe(e) {
    if (e.target.parentElement.id !== 'results-dropdown') {
      this.setState({results: ''});
      hashHistory.push(`/recipe/${e.target.parentElement.id}`);
    }
  },
  performSearch(e) {
    e.preventDefault();
    let searchString = this.refs.searchQuery.value.toLowerCase();
    $.ajax({
      url: `https://baas.kinvey.com/appdata/${settings.appKey}/Ingredients`,
      data: {query: JSON.stringify({"ingredient":{"$regex":("^.+"+searchString)+"|"+("^"+searchString)}})},
      success: (data) => {
        data.forEach((ingredient) => {
          $.ajax({
            url: `https://baas.kinvey.com/appdata/${settings.appKey}/drinkIngredients`,
            data: {
              query: JSON.stringify({"ingredient._id":ingredient._id}),
              resolve: 'drink'
            },
            success: (data) => {
              let results = data.map((drink, i) => {
                return (
                  <li key={i} onClick={this.routeToRecipe} id={drink.drink._obj._id}>
                    <h6>{drink.drink._obj.drink__strDrink}</h6>
                  </li>
                );
              });
              console.log(results);
              this.setState({results:results});
            }
          });
        });
      }
    });
  },
  render() {
    console.log(this.state.results);
    return(
      <form id="search-bar-form" onSubmit={this.performSearch}>
        <input type="text" id="search-input" placeholder="search..." ref="searchQuery"/>
        <button id="search-icon-btn" onClick={this.performSearch}>
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
        <div id="dropdown-wrapper">
          <ul id="results-dropdown">
            {this.state.results}
          </ul>
        </div>
      </form>
    );
  }
});
