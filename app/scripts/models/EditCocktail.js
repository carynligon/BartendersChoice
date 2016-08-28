import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

import settings from '../settings';
import store from '../store';

export default Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/appdata/${settings.appKey}/Cocktails`,
  idAttribute: '_id',
  updateCocktail(origModel, cocktailObj, currIngredients) {
      console.log(origModel);
      console.log(cocktailObj);
      let ingredients = cocktailObj.ingredients;
      let ingredientQuantities = cocktailObj.ingredientQuantities;
      let ingredientKeys = ['drink__strIngredient1','drink__strIngredient2','drink__strIngredient3','drink__strIngredient4','drink__strIngredient5','drink__strIngredient6','drink__strIngredient7','drink__strIngredient8','drink__strIngredient9'];
      console.log(ingredients);
      if (ingredients.length < 9) {
        let difference = 9 - ingredients.length;
        for (var i = ingredients.length; i <= (difference+1); i++) {
          ingredients[i] = null;
          ingredientQuantities[i] = null;
        }
      }
      _.object(ingredientKeys, ingredients);
      this.save({
        _id: origModel._id,
        drink__strDrink: cocktailObj.name,
        drink__strGlass: cocktailObj.glass,
        drink__strInstructions: cocktailObj.instructions,
        drink__strDrinkThumb: cocktailObj.image,
        drink__strIngredient1: ingredients[0],
        drink__strIngredient2: ingredients[1],
        drink__strIngredient3: ingredients[2],
        drink__strIngredient4: ingredients[3],
        drink__strIngredient5: ingredients[4],
        drink__strIngredient6: ingredients[5],
        drink__strIngredient7: ingredients[6],
        drink__strIngredient8: ingredients[7],
        drink__strIngredient9: ingredients[8],
        drink__strMeasure1: ingredientQuantities[0],
        drink__strMeasure2: ingredientQuantities[1],
        drink__strMeasure3: ingredientQuantities[2],
        drink__strMeasure4: ingredientQuantities[3],
        drink__strMeasure5: ingredientQuantities[4],
        drink__strMeasure6: ingredientQuantities[5],
        drink__strMeasure7: ingredientQuantities[6],
        drink__strMeasure8: ingredientQuantities[7],
        drink__strMeasure9: ingredientQuantities[8]
      }, {
        success: (data) => {
          currIngredients.forEach((ingredient) => {
            $.ajax({
              url: `https://baas.kinvey.com/appdata/${settings.appKey}/drinkIngredients/${ingredient._id}`,
              type: 'DELETE'
            });
          });
          console.log(store.allIngredients);
          store.allIngredients.models.forEach((model) => {
            console.log(model);
            model.destroy({
              success: (data) => {
                cocktailObj.ingredients.forEach((ingredient) => {
                  console.log(ingredient);
                  if (ingredient !== null) {
                    $.ajax({
                      url: `https://baas.kinvey.com/appdata/${settings.appKey}/Ingredients?query={"ingredient":"${ingredient.toLowerCase()}"}`,
                      success: (data) => {
                        console.log(data);
                        if (data.length === 0) {
                          $.ajax({
                            url: `https://baas.kinvey.com/appdata/${settings.appKey}/Ingredients`,
                            type: 'POST',
                            data: {
                              ingredient: ingredient.toLowerCase()
                            },
                            success: (data) => {
                              console.log(data);
                              $.ajax({
                                url: `https://baas.kinvey.com/appdata/${settings.appKey}/drinkIngredients`,
                                type: 'POST',
                                data: JSON.stringify({
                                  ingredientName: ingredient.toLowerCase(),
                                  ingredient: {
                                    _type: 'KinveyRef',
                                    _id: data._id,
                                    _collection: 'Ingredients'
                                  },
                                  drink: {
                                    _type: 'KinveyRef',
                                    _id: origModel._id,
                                    _collection: 'Cocktails'
                                  },
                                  drinkName: cocktailObj.name,
                                  quantity: cocktailObj.ingredientQuantities[i],
                                  skillLevel: cocktailObj.difficulty,
                                  tags: cocktailObj.flavorNotes,
                                  submittedBy: store.session.get('username')
                                }),
                                success: (data) => {
                                  console.log(data);
                                }
                              });
                            }
                          });
                        } else {
                          $.ajax({
                            url: `https://baas.kinvey.com/appdata/${settings.appKey}/drinkIngredients`,
                            type: 'POST',
                            data: {
                              ingredientName: ingredient.toLowerCase(),
                              ingredient: {
                                _type: 'KinveyRef',
                                _id: data._id,
                                _collection: 'Ingredients'
                              },
                              drink: {
                                _type: 'KinveyRef',
                                _id: origModel._id,
                                _collection: 'Cocktails'
                              },
                              drinkName: cocktailObj.name,
                              quantity: cocktailObj.ingredientQuantities[i],
                              skillLevel: cocktailObj.difficulty,
                              tags: cocktailObj.flavorNotes,
                              submittedBy: store.session.get('username')
                            },
                            success: (data) => {
                              console.log(data);
                            }
                          });
                        }
                      }
                  });
                }
              });
            }
          });
        });
      }
    })
  }
});
