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
          return get6Random(indices);
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
          <div id="about-section">
            <div id="about-cocktails">
              <h5>The Cocktails</h5>
              <img src="assets/images/data.png"/>
              <p>Along with the <a href="http://www.cocktaildb.com/">CocktailDB</a> API to gather cocktails, ingredients, and recipes -  we researched people just like you to find out just how certain cocktails make them feel to assign numerical values to the personality traits of cocktails.</p>
            </div>
            <div id="about-traitify">
              <h5>The Psychology</h5>
              <img src="assets/images/brain.png"/>
              <p>Now here's where you come in - We used a virtual personality assessment from <a href="https://www.traitify.com/">Traitify</a>, to determine your personality based on psychological big data that is collected from your personality assessment results.</p>
            </div>
            <div id="about-match">
              <h5>Your Drink</h5>
              <img src="assets/images/yourDrink.png"/>
              <p>And then it's all just math from there! We crunch the numbers and find a drink that best matches your personality.</p>
            </div>
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
