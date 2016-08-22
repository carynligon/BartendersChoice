import Backbone from 'backbone';
// import {hashHistory} from 'react-router';

import settings from '../settings';

import SearchResult from '../models/SearchResult';

export default Backbone.Collection.extend({
  url: `https://baas.kinvey.com/appdata/${settings.appKey}/drinkIngredients`,
  model: SearchResult,
  getResults: function(q, filterArr) {
    let searchString = q;
    console.log(filterArr);
    let queryParams;
    let skillLevel;
    if (filterArr) {
      skillLevel = {
        "skillLevel": filterArr
      };
    } else {
      skillLevel = {
        "skillLevel":{
          "$regex":("^.+")
        }
      };
    }
    console.log(searchString);
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
          ],
          "$and": [
            skillLevel
          ]
        })
      },
      success: (data) => {
        console.log(data);
        data.reduce((retsf, curr, i) => {
          console.log(retsf);
        }, []);
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
