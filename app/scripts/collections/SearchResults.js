import Backbone from 'backbone';
// import {hashHistory} from 'react-router';

import settings from '../settings';

import SearchResult from '../models/SearchResult';

export default Backbone.Collection.extend({
  url: `https://baas.kinvey.com/appdata/${settings.appKey}/drinkIngredients`,
  model: SearchResult,
  getResults: function(q) {
    let searchString = q;
    this.fetch({
      data: {
        resolve: 'drink',
        query: JSON.stringify({
          "$or":[
            {
              "ingredientName":{
                "$regex":("^.+"+searchString)+"|"+("^"+searchString)
              }
            },{
              "drinkName":{
                "$regex":("^.+"+searchString)+"|"+("^"+searchString)
              }
            }
          ]
        })
      },
      success: (data) => {
        data.forEach((result) => {
          this.add(result);
        });
      },
      error: (e) => {
        console.error(e);
      }
    });
  }
});
