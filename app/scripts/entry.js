import $ from 'jquery';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router';

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
    console.log(data);
    let allIngredients = [];
    data.map((drink) => {
      allIngredients.push(drink.drink__strIngredient1);
      allIngredients.push(drink.drink__strIngredient2);
      allIngredients.push(drink.drink__strIngredient3);
      allIngredients.push(drink.drink__strIngredient4);
      allIngredients.push(drink.drink__strIngredient5);
      allIngredients.push(drink.drink__strIngredient6);
      allIngredients.push(drink.drink__strIngredient7);
      allIngredients.push(drink.drink__strIngredient8);
      allIngredients.push(drink.drink__strIngredient9);
    });
    let unique = [];
    let reduced = allIngredients.reduce((retsf, curr) => {
      if (retsf.indexOf(curr) === -1 && curr !== null) {
        retsf.push(curr);
      }
      return retsf;
    },[]);
    console.log(reduced);
    reduced.forEach((ingredient) => {
      $.ajax({
        url: `https://baas.kinvey.com/appdata/${settings.appKey}/Ingredients`,
        type: 'POST',
        data: {ingredient: ingredient},
        success: (data) => {
          console.log(data);
        }
      });
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
