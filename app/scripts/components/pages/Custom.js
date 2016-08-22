import React from 'react';

import Nav from '../Nav';

export default React.createClass({
  getInitialState() {
    return {}
  },
  newIngredient(e) {
    e.preventDefault();
    let newIngredient = this.refs.newIngredient.value;
    console.log(newIngredient);
    this.setState({ingredients: this.state.ingredients.push(newIngredient)});
  },
  render() {
    console.log(this.state.ingredients);
    let ingredientsList;
    if (this.state.ingredients.length > 0) {
      ingredientsList = this.state.ingredients.map((ingredient, i) => {
        <li key={i}>{ingredient}</li>
      });
    }
    return (
      <main id="custom-cocktail-page">
        <Nav/>
        <form id="custom-cocktail-form">
          <h2>Submit your own cocktail!</h2>
          <label htmlFor="cocktail-name">Name of cocktail</label>
          <input type="text" id="cocktail-name"/>
          <label htmlFor="cocktail-difficulty">How hard is it to make?</label>
          <input type="range" id="cocktail-difficulty" min="1" max="3"/>
          <label htmlFor="cocktail-instructions">Mixing Instructions</label>
          <input type="text" id="cocktail-instructions"/>
          <ul id="ingredients-list">
            {ingredientsList}
          </ul>
          <label htmlFor="new-ingredient">Add Ingredient</label>
          <input type="text" id="new-ingredient" ref="newIngredient"/>
          <input type="button" id="add-ingredient" value="Add" onClick={this.newIngredient}/>
        </form>
      </main>
    );
  }
});
