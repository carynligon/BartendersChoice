import $ from 'jquery';
import React from 'react';
import _ from 'underscore';

import settings from '../../settings';
import session from '../../models/Session';
import store from '../../store';

import Header from '../Header';
import DrinkPreview from '../DrinkPreview';
import FilterBar from '../FilterBar';


export default React.createClass({
  getInitialState() {
    return {}
  },
  listener() {
    this.setState(store.cocktails.toJSON());
  },
  componentDidMount() {
    store.cocktails.on('update', this.listener);
    store.cocktails.fetch({
      data: JSON.stringify({
        query: {drink__strDrinkThumb:{
          "$regex": "^http"
        }}
      })
    });
  },
  componentWillUnmount() {
    store.cocktails.off('update', this.listener);
  },
  render() {
    let data = _.toArray(this.state);
    let drinksWithImgs = data.filter((drink, i) => {
      return drink.drink__strDrinkThumb !== null;
    });
    let randomDrinks = [];
    _(4).times(function() {
      randomDrinks.push(drinksWithImgs[Math.floor(Math.random() * drinksWithImgs.length)]);
    });
    let drinks;
    if (randomDrinks[0] !== undefined) {
      drinks = randomDrinks.map((drink,i) => {
        return <DrinkPreview id={drink._id} img={drink.drink__strDrinkThumb} name={drink.drink__strDrink} key={i}/>;
      });
    }
    return (
      <main>
        <Header/>
        <section id="how-it-works">
          <h2>How it Works</h2>
          <div id="about-cocktails">
            <h5>The Cocktails</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.</p>
          </div>
          <div id="about-traitify">
            <h5>The Psychology</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.</p>
          </div>
          <div id="about-match">
            <h5>Your Drink</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.</p>
          </div>
        </section>
        <ul id="cocktail-list">
          <h2>FEATURED RECIPES</h2>
          {drinks}
        </ul>
        {this.props.children}
      </main>
    );
  }
});