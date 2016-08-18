import $ from 'jquery';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router';
import _ from 'underscore';

import router from './router';
import store from './store';
import settings from './settings';

$(document).ajaxSend(function(evt, xhrAjax, jqueryAjax) {
    if (localStorage.getItem('authtoken')) {
      xhrAjax.setRequestHeader('Authorization', 'Kinvey ' + localStorage.getItem('authtoken'));
    } else {
      xhrAjax.setRequestHeader('Authorization', 'Basic ' + settings.basicAuth);
    }
});


$.ajax({
  url: `https://baas.kinvey.com/appdata/${settings.appKey}/Cocktails`,
  success: (data) => {
    let cocktails = data;
    $.ajax({
      url: `https://baas.kinvey.com/appdata/${settings.appKey}/Ingredients`,
      success: (data) => {
        let ingredients = data;
        let drinkIngredients = [];
        cocktails.forEach((drink) => {
          let ingredientArr = [
            {drinkId: drink._id, ingredient: drink.drink__strIngredient1, quantity: drink.drink__strMeasure1},
            {drinkId: drink._id, ingredient: drink.drink__strIngredient2, quantity: drink.drink__strMeasure2},
            {drinkId: drink._id, ingredient: drink.drink__strIngredient3, quantity: drink.drink__strMeasure3},
            {drinkId: drink._id, ingredient: drink.drink__strIngredient4, quantity: drink.drink__strMeasure4},
            {drinkId: drink._id, ingredient: drink.drink__strIngredient5, quantity: drink.drink__strMeasure5},
            {drinkId: drink._id, ingredient: drink.drink__strIngredient6, quantity: drink.drink__strMeasure6},
            {drinkId: drink._id, ingredient: drink.drink__strIngredient7, quantity: drink.drink__strMeasure7},
            {drinkId: drink._id, ingredient: drink.drink__strIngredient8, quantity: drink.drink__strMeasure8},
            {drinkId: drink._id, ingredient: drink.drink__strIngredient9, quantity: drink.drink__strMeasure9},
          ]
          let nullRemoved = [];
          ingredientArr.forEach((ingredient) => {
            if (ingredient.ingredient !== null) {
              nullRemoved.push(ingredient);
            }
          });
          drinkIngredients.push(nullRemoved);
        });
        (_.flatten(drinkIngredients)).forEach((drinkIngredient) => {
          ingredients.forEach((ingredient) => {
            if (ingredient.ingredient === drinkIngredient.ingredient) {
              drinkIngredient.ingredientID = ingredient._id;
            }
          });
        });
        (_.flatten(drinkIngredients)).forEach((ingredient) => {
          $.ajax({
            url: `https://baas.kinvey.com/appdata/${settings.appKey}/drinkIngredients`,
            type: 'POST',
            data: {
              ingredient: ingredient.ingredient,
              ingredientID: ingredient.ingredientID,
              drinkID: ingredient.drinkId,
              quantity: ingredient.quantity
            }
          });
        });
      }
    });
  }
});


// ReactDOM.render(router, document.getElementById('container'));
//
// if (localStorage.getItem('authtoken') && localStorage.getItem('username') !== 'Anonymous') {
//   store.session.retrieve();
// } else {
//   hashHistory.push('/confirm');
//   store.session.save({
//     username: 'Anonymous',
//     password: '1234'
//   }, {
//     success: function(data) {
//       localStorage.setItem('authtoken', data.get('authtoken'));
//       store.session.set({
//         username: 'Anonymous',
//         password: '1234'
//       });
//       localStorage.setItem('username', 'Anonymous');
//     }
//   });
// }
