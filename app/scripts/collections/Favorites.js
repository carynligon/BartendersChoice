import $ from 'jquery';
import Backbone from 'backbone';

import settings from '../settings';
import store from '../store';

import Favorite from '../models/Favorite';

export default Backbone.Collection.extend({
  url: `https://baas.kinvey.com/appdata/${settings.appKey}/Favorites`,
  model: Favorite,
  favorite(drink, user) {
    this.create({
      drinkName: drink.get('drink__strDrink'),
      username: user.get('username'),
      userId: user.get('userId'),
      drink: {
        _type: 'KinveyRef',
        _id: drink.get('_id'),
        _collection: 'Cocktails'
      },
    }, {
      success: (data) => {
      }
    });
  },
  getDrinks() {
    // this.fetch({
    //   data: {
    //     query: JSON.stringify({
    //       username: username
    //     })
    //   },
    //   success: (data) => {
    //     console.log(data);
    //   }
    // });
  }
});
