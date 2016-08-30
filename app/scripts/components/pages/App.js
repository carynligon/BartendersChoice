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
    if (localStorage.getItem('username') === 'Anonymous') {
      return {loggedIn: false}
    } else {
      return {loggedIn: true}
    }
  },
  listener() {
    this.setState({
      cocktails: store.cocktails.toJSON(),
    });
  },
  componentDidMount() {
    if (localStorage.getItem('username') === 'Anonymous') {
      this.setState({loggedIn: false});
    } else {
      console.log(store.session);
      this.setState({loggedIn: true});
    }
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
    let drinks;
    let data = _.toArray(this.state.cocktails);
    if (data.length) {
      let drinksWithImgs = data.filter((drink, i) => {
        return drink.drink__strDrinkThumb !== null;
      });
      function get6Random(indices) {
           if (indices.length === 6) return indices;
          let randomNumber = (Math.floor(Math.random() * drinksWithImgs.length));
          console.log(randomNumber);
          if (indices.indexOf(randomNumber) === -1) {
            indices.push(randomNumber);
            console.log(indices);
            console.log(store.cocktails);
          } else {
              return get6Random(indices);
          }
          // } else {
          //   randomNumber = (Math.floor(Math.random() * drinksWithImgs.length));
          return get6Random(indices);

        // });
      }
      let indices = get6Random([]);
      console.log(indices);
      let randomDrinks = indices.map((index) => {
        return drinksWithImgs[index];
      });
      console.log(randomDrinks);
      if (randomDrinks[0] !== undefined) {
        drinks = randomDrinks.map((drink,i) => {
          return <DrinkPreview id={drink._id} img={drink.drink__strDrinkThumb} name={drink.drink__strDrink} loggedIn={this.state.loggedIn} key={i}/>;
        });
      } else {
        console.log(randomDrinks);
      }
    }

    return (
      <main>
        <Header/>
        <section id="how-it-works">
          <h2 className="app-titles">How it Works</h2>
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
          <h2 className="app-titles">FEATURED RECIPES</h2>
          {drinks}
        </ul>
        {this.props.children}
      </main>
    );
  }
});
