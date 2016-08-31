import $ from 'jquery';
import Backbone from 'backbone';

import settings from '../settings';

export default Backbone.Collection.extend({
  url: `https://baas.kinvey.com/appdata/${settings.appKey}/drinkIngredients`,
  getDrinks(username) {
    return new Promise ((resolve, reject) => {
      $.ajax(`https://baas.kinvey.com/appdata/${settings.appKey}/drinkIngredients/?resolve="drink"&query={"submittedBy":"${username}"}`).then((data) => {
        data.forEach((drink) => {
          this.add(drink);
        });
        resolve(this);
      });
    });
  }
});
