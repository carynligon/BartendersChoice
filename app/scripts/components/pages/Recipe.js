import React from 'react';

import store from '../../store';
import Nav from '../Nav';

export default React.createClass({
  getInitialState() {
    return {};
  },
  sendBack() {
    hashHistory.push('/');
  },
  listener() {
    this.setState(store.cocktails.get(this.props.params.cocktail).toJSON());
  },
  componentDidMount() {
    store.cocktails.on('update', this.listener);
    store.cocktails.getCocktails();
  },
  componentWillUnmount() {
    store.cocktails.off('update', this.listener);
  },
  render() {
    return(
      <main>
        <Nav/>
        <input type="button" id="back-btn" value="back" onClick={this.sendBack}/>
        <h2>{this.state.drink__strDrink}</h2>
        <h4>Ingredients</h4>
        <ul>
          <li>{this.state.drink__strIngredient1} {this.state.drink__strMeasure1}</li>
          <li>{this.state.drink__strIngredient2} {this.state.drink__strMeasure2}</li>
          <li>{this.state.drink__strIngredient3} {this.state.drink__strMeasure3}</li>
          <li>{this.state.drink__strIngredient4} {this.state.drink__strMeasure4}</li>
          <li>{this.state.drink__strIngredient5} {this.state.drink__strMeasure5}</li>
          <li>{this.state.drink__strIngredient6} {this.state.drink__strMeasure6}</li>
          <li>{this.state.drink__strIngredient7} {this.state.drink__strMeasure7}</li>
          <li>{this.state.drink__strIngredient8} {this.state.drink__strMeasure8}</li>
        </ul>
        <h4>Mixing Instructions</h4>
        <p>{this.state.drink__strInstructions}</p>
      </main>
    );
  }
});
