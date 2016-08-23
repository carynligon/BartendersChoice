import _ from 'underscore';
import React from 'react';

import store from '../../store';

import Nav from '../Nav';
import CustomPreview from '../CustomPreview';

export default React.createClass({
  getInitialState() {
    return {preview: false}
  },
  newIngredient(e) {
    if (e) {
      e.preventDefault();
    }
    let newIngredient = this.refs.newIngredient.value;
    let newIngredientQuantity = this.refs.newIngredientQuantity.value;
    console.log(newIngredient);
    if (this.state.ingredients) {
      this.setState({ingredients: this.state.ingredients.concat(newIngredient), ingredientQuantities: this.state.ingredientQuantities.concat(newIngredientQuantity)});
    } else {
      this.setState({ingredients: [newIngredient], ingredientQuantities: [newIngredientQuantity]});
    }
  },
  pressedEnter(e) {
    if (e.which === 13) {
      this.newIngredient();
    }
  },
  componentWillReceiveProps(nextProps) {
    this.setState({ingredients: this.state.ingredients})
  },
  deleteIngredient(e) {
    e.preventDefault();
    let ingredient;
    if (e.target.id === 'delete-btn') {
      ingredient = e.target.previousSibling.textContent;
    }
    if (e.target.className === 'fa fa-times delete-icon') {
      ingredient = e.target.parentElement.previousSibling.textContent;
    }
    console.log(ingredient);
    let removedIngredients = _.without(this.state.ingredients, ingredient);
    this.setState({ingredients: removedIngredients});
  },
  uploadImg(e) {
    e.preventDefault();
    let file = this.refs.file.files[0];
    let reader = new FileReader();
    let url = reader.readAsDataURL(file);
    reader.onloadend = function() {
      this.setState({
        image: [reader.result]
      });
    }.bind(this);
    if (reader.readyState === 2) {
      reader.readAsDataURL(file);
    }
  },
  showPreview(e) {
    let difficulty;
    if (this.refs.difficulty.value === '1') {
      difficulty = 'easy';
    } else if (this.refs.difficulty.value === '2') {
      difficulty = 'medium';
    } else if (this.refs.difficulty.value === '3') {
      difficulty = 'difficult';
    }
    let cocktail = {
      name: this.refs.name.value,
      difficulty: difficulty,
      instructions: this.refs.instructions.value,
      glass: this.refs.cocktailGlass.value,
      ingredients: this.state.ingredients,
      ingredientQuantities: this.state.ingredientQuantities
    }
    this.setState({cocktail})
    store.customCocktails.createCocktail(cocktail);
    e.preventDefault();
  },
  listener() {
    store.customCocktails.forEach((cocktail) => {
      console.log(cocktail.id);
    })
    this.setState({cocktails: store.customCocktails.models[0].get('_id'), preview: true});
  },
  componentDidMount() {
    store.customCocktails.on('update', this.listener);
  },
  componentWillUnmount() {
    store.customCocktails.off('update', this.listener);
  },
  render() {
    let modal;
    if (this.state.preview) {
      modal = <CustomPreview info={this.state.cocktail}/>
    }
    console.log(this.state);
    let zippedIngredients = _.zip(this.state.ingredients, this.state.ingredientQuantities);
    let ingredientsList;
    if (this.state.ingredients) {
      ingredientsList = zippedIngredients.map((ingredient, i) => {
        if (ingredient[0] !== null) {
          return (
            <li key={i}>
              <p className="ingredient-name">{ingredient[0]}</p>
              <p className="ingredient-quantity">{ingredient[1]}</p>
              <button id="delete-btn" className={ingredient} onClick={this.deleteIngredient}><i className="fa fa-times delete-icon" aria-hidden="true"></i></button>
            </li>
          );
        }
      });
    }
    return (
      <main id="custom-cocktail-page">
        <Nav/>
        <form id="custom-cocktail-form">
          <h2>ADD YOUR OWN COCKTAIL</h2>

          <div id="cocktail-name-wrapper">
            <label htmlFor="cocktail-name">Name of cocktail</label>
            <input type="text" id="cocktail-name" autocomplete="off" ref="name"/>
          </div>

          <div id="image-uploader-wrapper">
            <label htmlFor="image-uploader">Upload an image</label>
            <input type="file" id="image-uploader" accept="image/*" ref="file" onChange={this.uploadImg}/>
          </div>

          <div id="cocktail-difficulty-wrapper">
            <label htmlFor="cocktail-difficulty">How hard is it to make?</label>
            <input type="range" id="cocktail-difficulty" min="1" max="3" ref="difficulty"/>
          </div>

          <div id="cocktail-instructions-wrapper">
            <label htmlFor="cocktail-instructions">Mixing Instructions</label>
            <input type="text" id="cocktail-instructions" autocomplete="off" ref="instructions"/>
          </div>

          <div id="cocktail-glass-wrapper">
            <label htmlFor="cocktail-glass">Serving Glass</label>
            <input type="text" id="cocktail-glass" autocomplete="off" ref="cocktailGlass"/>
          </div>

          <ul id="ingredients-list">
            {ingredientsList}
          </ul>

          <div id="new-ingredient-wrapper">
            <label htmlFor="new-ingredient">Ingredient</label>
            <input type="text" id="new-ingredient" autocomplete="off" ref="newIngredient"/>
          </div>

          <div id="new-ingredient-quantity-wrapper">
            <label htmlFor="new-ingredient-quantity">Quantity</label>
            <input type="text" id="new-ingredient-quantity" autocomplete="off" ref="newIngredientQuantity" onKeyUp={this.pressedEnter}/>
          </div>

          <input type="button" id="add-ingredient" value="Add" onClick={this.newIngredient}/>
          <input type="submit" id="submit-cocktail" value="submit" onClick={this.showPreview}/>
        </form>
        {modal}
      </main>
    );
  }
});
