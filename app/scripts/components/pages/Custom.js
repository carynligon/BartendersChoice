import $ from 'jquery';
import _ from 'underscore';
import React from 'react';

import store from '../../store';
import settings from '../../settings';

import Nav from '../Nav';
import CustomPreview from '../CustomPreview';

export default React.createClass({
  getInitialState() {
    return {
      preview: false,
      sweet: false,
      bubbly: false,
      fruity: false,
      creamy: false,
      spicy: false,
      dry: false,
      sour: false,
      salty: false,
      spiritForward: false,
      bitter: false,
      tags: []
    }
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
  componentWillReceiveProps(nextProps) {
    this.setState({ingredients: this.state.ingredients})
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
  uploadImg(e) {
    let file = e.target.files[0];
    let fileId;
    $.ajax({
      url: `https://baas.kinvey.com/blob/${settings.appKey}`,
      type: 'POST',
      contentType: 'application/json',
      headers: {"X-Kinvey-Content-Type": file.type},
      data: JSON.stringify({
        _public: true,
        _filename: file.name,
        mimeType: file.type
      }),
      success: (data) => {
        console.log(data);
        fileId = data._id;
        this.setState({img: fileId});
        $.ajax({
          url: data._uploadURL,
          headers: data._requiredHeaders,
          data: file,
          contentLength: file.size,
          type: 'PUT',
          processData: false,
          contentType: false,
          success: (data) => {
            console.log(data);
          }
        });
      }
    });
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
      glass: this.refs.cocktailGlass.value.toLowerCase(),
      ingredients: this.state.ingredients,
      ingredientQuantities: this.state.ingredientQuantities,
      flavorNotes: this.state.tags,
      img: this.state.img
    }
    this.setState({cocktail})
    store.customCocktails.createCocktail(cocktail);
    e.preventDefault();
  },
  listener() {
    let cocktailId;
    let cocktailName;
    store.customCocktails.forEach((cocktail) => {
      cocktailId = cocktail.id;
      cocktailName = cocktail.get('drink__strDrink');
    })
    this.setState({cocktailId: cocktailId, cocktailName: cocktailName, preview: true});
  },
  componentDidMount() {
    store.customCocktails.on('update', this.listener);
  },
  componentWillUnmount() {
    store.customCocktails.off('update', this.listener);
  },
  render() {
    console.log(this.state);
    let modal;
    if (this.state.cocktailId) {
      modal = <CustomPreview id={this.state.cocktailId} name={this.state.cocktailName}/>
    }
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
          <h2>Add Your Own Cocktail</h2>

          <div id="cocktail-name-wrapper">
            <label htmlFor="cocktail-name">Name of cocktail:</label>
            <input type="text" id="cocktail-name" autoComplete="off" ref="name"/>
          </div>

          <div id="image-uploader-wrapper">
            <p id="upload-img-text">Image:</p>
            <label htmlFor="image-uploader">Upload image <i className="fa fa-upload upload-icon" aria-hidden="true"></i></label>
            <input type="file" id="image-uploader" accept="image/*" ref="file" onChange={this.uploadImg}/>
          </div>

          <div id="cocktail-difficulty-wrapper">
            <label htmlFor="cocktail-difficulty">How hard is it to make?:</label>
            <input type="range" id="cocktail-difficulty" min="1" max="3" ref="difficulty"/>
          </div>

          <div id="cocktail-instructions-wrapper">
            <label htmlFor="cocktail-instructions">Mixing Instructions:</label>
            <textarea id="cocktail-instructions" autoComplete="off" ref="instructions"></textarea>
          </div>

          <div id="cocktail-glass-wrapper">
            <label htmlFor="cocktail-glass">Serving Glass:</label>
            <input type="text" id="cocktail-glass" autoComplete="off" ref="cocktailGlass"/>
          </div>

          <ul id="ingredients-list">
            {ingredientsList}
          </ul>

          <h4>Ingredients</h4>
          <div id="new-ingredient-wrapper">
            <label htmlFor="new-ingredient">Name:</label>
            <input type="text" id="new-ingredient" autoComplete="off" ref="newIngredient"/>
          </div>

          <div id="new-ingredient-quantity-wrapper">
            <label htmlFor="new-ingredient-quantity">Quantity:</label>
            <input type="text" id="new-ingredient-quantity" autoComplete="off" ref="newIngredientQuantity" onKeyUp={this.pressedEnter}/>
            <button id="add-ingredient" value="Add" onClick={this.newIngredient}>Add</button>
          </div>

          <h4 id="flavor-profile-title">Flavor Notes:</h4>
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

          <button type="submit" id="submit-cocktail" value="submit" onClick={this.showPreview}>submit</button>
        </form>
        {modal}
      </main>
    );
  }
});
