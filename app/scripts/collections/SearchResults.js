import _ from 'underscore';
import Backbone from 'backbone';
// import {hashHistory} from 'react-router';

import settings from '../settings';

import SearchResult from '../models/SearchResult';

export default Backbone.Collection.extend({
  url: `https://baas.kinvey.com/appdata/${settings.appKey}/drinkIngredients`,
  model: SearchResult,
  getResults: function(q, filterArr) {
    let searchString = q;
    let flavors = ['sweet', 'salty', 'sour', 'spirit-forward', 'bitter', 'bubbly', 'fruity', 'creamy', 'spicy', 'dry'];
    let selectedFlavors = [];
    let selectedAlcohol;
    let alcohols = ['bourbon', 'rye', 'tequila', 'gin', 'vodka', 'scotch', 'other'];
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
            selectedFlavors.push({"tags": oneFilter});
          } else if (alcohols.indexOf(oneFilter) !== -1) {
            selectedAlcohol = {
              "ingredientName": oneFilter
            }
          }
        });
        let flavorChecker = [];
        let alcoholChecker = [];
        flavors.forEach((flavor) => {
          if (filterArr.indexOf(flavor) !== -1) {
            flavorChecker.push(flavor)
          }
        });
        if (flavorChecker === []) {
          selectedFlavors = {
            "tags":{
              "$regex":("^.+")
            }
          };
        }
        alcohols.forEach((alcohol) => {
          if (filterArr.indexOf(alcohol) !== -1) {
            alcoholChecker.push(alcohol)
          }
        });
        if (alcoholChecker.length === 0 || alcoholChecker.indexOf('other') !== -1) {
          selectedAlcohol = {
            "ingredientName":{
              "$regex":("^.+")
            }
          };
        }
      }
      else {
      skillLevel = {
        "skillLevel":{
          "$regex":("^.+")
        }
      };
      selectedFlavors = {
        "tags":{
          "$regex":("^.+")
        }
      };
      selectedAlcohol = {
        "ingredientName":{
          "$regex":("^.+")
        }
      };
    }
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
            ...selectedFlavors,
            selectedAlcohol
          ]
        })
      },
      success: (data) => {
        data.reduce((retsf, curr, i) => {
        }, []);
        data.forEach((result) => {
          this.add(result);
        });
      },
      error: (e) => {
      }
    });
  }
});
