import Backbone from 'backbone';

import settings from '../settings';

import SavedForLater from '../models/SavedForLater';

export default Backbone.Collection.extend({
  url: `https://baas.kinvey.com/appdata/${settings.appKey}/SavedForLater`,
  model: SavedForLater,
  bookmark(drink, user) {
    console.log(drink, user);
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
        console.log(data);
      }
    });
  }
});
