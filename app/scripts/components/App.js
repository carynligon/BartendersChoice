import $ from 'jquery';
import React from 'react';
import _ from 'underscore';

import settings from '../settings';
import session from '../models/Session';
import store from '../store';

import Nav from './Nav';
import DrinkPreview from './DrinkPreview';
import FilterBar from './FilterBar';


export default React.createClass({
  getInitialState() {
    return {}
  },
  listener() {
    this.setState(store.cocktails.toJSON());
  },
  componentDidMount() {
    store.cocktails.on('update', this.listener);
    store.cocktails.getCocktails();
  },
  componentWillUnmount() {
    store.cocktails.off('update', this.listener);
  },
  render() {
    let data = _.toArray(this.state);
    let drinksWithImgs = data.filter((drink) => {
      return drink.drink__strDrinkThumb !== null;
    });
    console.log(drinksWithImgs);
    let drinks = drinksWithImgs.map((drink,i) => {
      return <DrinkPreview id={drink._id} img={drink.drink__strDrinkThumb} name={drink.drink__strDrink} key={i}/>
    });
    store.session.save({
      username: 'admin',
      password: '1234'
    }, {
      success: (data) => {
        localStorage.setItem('authtoken', data.get('_kmd').authtoken);
      }
    });
    return (
      <main>
        <Nav/>
        <FilterBar/>
        <ul id="cocktail-list">
          {drinks}
        </ul>
        {this.props.children}
      </main>
    );
  }
});


// $.ajax({
//   url: `https://baas.kinvey.com/rpc/${settings.appKey}/custom/cocktails`,
//   type: 'POST',
//   success: (data) => {
//     console.log(data);
//     data.drinks.forEach((drink) => {
//       store.cocktails.create({
//         drink
//       }, {
//         success: (resp) => {
//           console.log(resp);
//         }
//       });
//     });
//     console.log(drinks);
//   },
//   error: (data) => {
//     console.log(data);
//   }
// });
