import _ from 'underscore';
import React from 'react';

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
    this.setState({
      name: this.refs.name.value,
      difficulty: this.refs.difficulty.value,
      instructions: this.refs.instructions.value,
      preview: true
    });
    e.preventDefault();
  },
  render() {
    let modal;
    if (this.state.preview) {
      modal = <CustomPreview info={this.state} showing={true}/>
    }
    console.log(this.state);
    let zippedIngredients = _.zip(this.state.ingredients, this.state.ingredientQuantities);
    let ingredientsList;
    if (this.state.ingredients) {
      ingredientsList = zippedIngredients.map((ingredient, i) => {
        return (
          <li key={i}>
            <p className="ingredient-name">{ingredient[0]}</p>
            <p className="ingredient-quantity">{ingredient[1]}</p>
            <button id="delete-btn" className={ingredient} onClick={this.deleteIngredient}><i className="fa fa-times delete-icon" aria-hidden="true"></i></button>
          </li>
        );
      });
    }
    return (
      <main id="custom-cocktail-page">
        <Nav/>
        <form id="custom-cocktail-form">
          <h2>Submit your own cocktail!</h2>

          <label htmlFor="cocktail-name">Name of cocktail</label>
          <input type="text" id="cocktail-name" ref="name"/>

          <label htmlFor="image-uploader">Upload an image</label>
          <input type="file" id="image-uploader" accept="image/*" ref="file" onChange={this.uploadImg}/>

          <label htmlFor="cocktail-difficulty">How hard is it to make?</label>
          <input type="range" id="cocktail-difficulty" min="1" max="3" ref="difficulty"/>

          <label htmlFor="cocktail-instructions">Mixing Instructions</label>
          <input type="text" id="cocktail-instructions" ref="instructions"/>

          <ul id="ingredients-list">
            {ingredientsList}
          </ul>

          <label htmlFor="new-ingredient">Ingredient</label>
          <input type="text" id="new-ingredient" ref="newIngredient"/>

          <label htmlFor="new-ingredient-quantity">Quantity</label>
          <input type="text" id="new-ingredient-quantity" ref="newIngredientQuantity" onKeyUp={this.pressedEnter}/>

          <input type="button" id="add-ingredient" value="Add" onClick={this.newIngredient}/>
          <input type="submit" id="submit-cocktail" value="submit" onClick={this.showPreview}/>
        </form>
        {modal}
      </main>
    );
  }
});
