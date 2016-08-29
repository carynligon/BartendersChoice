import React from 'react';
import _ from 'underscore';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return {
      ingredients: [],
      ingredientQuantities: [],
      currCocktail: this.props.cocktail.toJSON(),
      id: this.props.id,
      tags: [],
      ingredientModels: this.props.ingredients
    }
  },
  changeStatus(e) {
    let flavor;
    if (e.target.id !== 'custom-spirit-forward') {
      flavor = e.target.id.split('-')[1];
    } else {
      flavor = 'spirit-forward';
    }
    console.log(flavor);
    if (e.target.checked === true) {
      this.setState({tags: this.state.tags.concat(flavor)});
    }
  },
  deleteIngredient(e) {
    e.preventDefault();
    let ingredient;
    if (e.target.id === 'delete-btn') {
      ingredient = e.target.previousSibling.previousSibling.textContent;
    }
    if (e.target.className === 'fa fa-times delete-icon') {
      ingredient = e.target.parentElement.previousSibling.previousSibling.textContent;
    }
    let index = this.state.ingredients.indexOf(ingredient);
    this.state.ingredients.splice(index, 1);
    this.state.ingredientQuantities.splice(index, 1);
    this.setState({ingredients: this.state.ingredients, ingredientQuantities: this.state.ingredientQuantities})
  },
  newIngredient(e) {
    if (e) {
      e.preventDefault();
    }
    let newIngredient = this.refs.newIngredient.value;
    let newIngredientQuantity = this.refs.newIngredientQuantity.value;
    console.log(newIngredient);
    if (this.props.ingredients) {
      this.setState({ingredients: this.state.ingredients.concat(newIngredient), ingredientQuantities: this.state.ingredientQuantities.concat(newIngredientQuantity)});
    } else {
      this.setState({ingredients: [newIngredient], ingredientQuantities: [newIngredientQuantity]});
    }
  },
  showPreview(e) {
    e.preventDefault();
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
      ingredientQuantities: this.state.ingredientQuantities,
      flavorNotes: this.state.tags,
      ingredientModels: this.props.ingredients
    }
    store.editCocktail.updateCocktail(this.state.currCocktail, cocktail, this.state.ingredientModels);
  },
  componentDidMount() {
    console.log(this.state.ingredientModels);
    let ingredients = [];
    let ingredientQuantities = []
    this.state.ingredientModels.forEach((ingredient) => {
      ingredients.push(ingredient.ingredientName);
      ingredientQuantities.push(ingredient.quantity);
      ingredient.tags.forEach((tag) => {
        let id = 'custom-' + tag;
        document.getElementById(id).checked = true;
      });
    });
    this.setState({
      ingredients: ingredients,
      ingredientQuantities: ingredientQuantities
    });
    console.log(ingredients);
  },
  render() {
    console.log(this.state);
    let ingredients;
    let title;
    if (location.hash.split('/')[1].split('?')[0] !== 'me') {
      title = (<h2>ADD YOUR OWN COCKTAIL</h2>);
    }
    let zippedIngredients = _.zip(this.state.ingredients, this.state.ingredientQuantities);
    let newIngredients;
    if (this.state.ingredients !== []) {
      newIngredients = zippedIngredients.map((ingredient, i) => {
        console.log(ingredient);
        return (
          <li key={i}>
            <p className="ingredient-name">{ingredient[0]}</p>
            <p className="ingredient-quantity">{ingredient[1]}</p>
            <button id="delete-btn" className={ingredient} onClick={this.deleteIngredient}><i className="fa fa-times delete-icon" aria-hidden="true"></i></button>
          </li>
        )
      });
    }
    let styles;
    if (this.props.img === null || this.props.img === undefined) {
      styles = {
        backgroundImage: 'url(assets/images/Cocktail-icon.png)'
      }
    } else {
      styles = {
        backgroundImage: 'url(' + this.props.img + ')'
      }
    }
    return (
      <form id="custom-cocktail-form">
        {title}

        <div id="cocktail-name-wrapper">
          <label htmlFor="cocktail-name">Name of cocktail:</label>
          <input type="text" id="cocktail-name" autoComplete="off" ref="name" defaultValue={this.props.name}/>
        </div>

        <div id="cocktail-image" style={styles}>
        </div>

        <div id="image-uploader-wrapper">
          <label htmlFor="image-uploader">Upload image <i className="fa fa-upload upload-icon" aria-hidden="true"></i></label>
          <input type="file" id="image-uploader" accept="image/*" ref="file" onChange={this.uploadImg}/>
        </div>

        <div id="cocktail-difficulty-wrapper">
          <label htmlFor="cocktail-difficulty">How hard is it to make?:</label>
          <input type="range" id="cocktail-difficulty" min="1" max="3" ref="difficulty"/>
        </div>

        <div id="cocktail-instructions-wrapper">
          <label htmlFor="cocktail-instructions">Mixing Instructions:</label>
          <input type="text" id="cocktail-instructions" autoComplete="off" ref="instructions" defaultValue={this.state.currCocktail.drink__strInstructions}/>
        </div>

        <div id="cocktail-glass-wrapper">
          <label htmlFor="cocktail-glass">Serving Glass:</label>
          <input type="text" id="cocktail-glass" autoComplete="off" ref="cocktailGlass" defaultValue={this.state.currCocktail.drink__strGlass}/>
        </div>

        <ul id="ingredients-list">
          {ingredients}
          {newIngredients}
        </ul>

        <div id="new-ingredient-wrapper">
          <label htmlFor="new-ingredient">Ingredient:</label>
          <input type="text" id="new-ingredient" autoComplete="off" ref="newIngredient"/>
        </div>

        <div id="new-ingredient-quantity-wrapper">
          <label htmlFor="new-ingredient-quantity">Quantity:</label>
          <input type="text" id="new-ingredient-quantity" autoComplete="off" ref="newIngredientQuantity"/>
        </div>

        <input type="button" id="add-ingredient" value="Add" onClick={this.newIngredient}/>

        <div id="flavor-profile-wrapper">
          <input type="checkbox" id="custom-sweet" onChange={this.changeStatus}/>
          <label htmlFor="custom-sweet">sweet</label>
          <input type="checkbox" id="custom-bubbly" onChange={this.changeStatus}/>
          <label htmlFor="custom-bubbly">bubbly</label>
          <input type="checkbox" id="custom-fruity" onChange={this.changeStatus}/>
          <label htmlFor="custom-fruity">fruity</label>
          <input type="checkbox" id="custom-creamy" onChange={this.changeStatus}/>
          <label htmlFor="custom-creamy">creamy</label>
          <input type="checkbox" id="custom-spicy" onChange={this.changeStatus}/>
          <label htmlFor="custom-spicy">spicy</label>
          <input type="checkbox" id="custom-dry" onChange={this.changeStatus}/>
          <label htmlFor="custom-dry">dry</label>
          <input type="checkbox" id="custom-sour" onChange={this.changeStatus}/>
          <label htmlFor="custom-sour">sour</label>
          <input type="checkbox" id="custom-salty" onChange={this.changeStatus}/>
          <label htmlFor="custom-salty">salty</label>
          <input type="checkbox" id="custom-spirit-forward" onChange={this.changeStatus}/>
          <label htmlFor="custom-spirit-forward">spirit-forward</label>
          <input type="checkbox" id="custom-bitter" onChange={this.changeStatus}/>
          <label htmlFor="custom-bitter">bitter</label>
        </div>

        <input type="submit" id="submit-cocktail" value="submit" onClick={this.showPreview}/>
      </form>
    );
  }
});
