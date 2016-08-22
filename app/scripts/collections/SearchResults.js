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
    let flavors = ['sweet', 'salty', 'sour', 'spirit-forward', 'bitter', 'bubbly', 'fruity', 'creamy', 'spicy', 'dry'];
    let selectedFlavors = [];
    let flavorSearch;
    let alcohols = ['bourbon', 'rye', 'tequila', 'gin', 'vodka', 'other-alcohol']
    let queryParams;
    let skillLevel;
    if (filterArr) {
      filterArr.forEach((oneFilter) => {
        if (oneFilter === '1') {
          skillLevel = {
            "skillLevel": "easy"
          }
        } else if (oneFilter === '2') {
          skillLevel = {
            "skillLevel": "medium"
          }
        } else if (oneFilter === '3') {
            skillLevel = {
              "skillLevel": "difficult"
            }
          } else if (flavors.indexOf(oneFilter) !== -1) {
            selectedFlavors.push(oneFilter);
          }
        });
      }
      if (selectedFlavors !== []) {
        flavorSearch = selectedFlavors.map((flavor) => {
          return {
            "tags": flavor
          }
        });
      } else {
      skillLevel = {
        "skillLevel":{
          "$regex":("^.+")
        }
      };
      flavorSearch = {
        "tags":{
          "$regex":("^.+")
        }
      };
    }
    console.log(skillLevel);
    console.log(flavorSearch);
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
            skillLevel,
            flavorSearch[0]
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
