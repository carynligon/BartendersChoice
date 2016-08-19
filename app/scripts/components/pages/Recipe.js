import React from 'react';
import {hashHistory} from 'react-router';

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
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState(store.cocktails.get(nextProps.params.cocktail).toJSON());
  },
  render() {
    console.log(this.state);
    let background;
    if (this.state.drink__strDrinkThumb === null) {
      background = {
        backgroundImage: 'url(assets/images/Cocktail-icon.png)'
      };
    } else {
      background = {
        backgroundImage: 'url(' + this.state.drink__strDrinkThumb + ')'
      }
    }
    return(
      <main>
        <Nav/>
        <button id="back-btn" onClick={this.sendBack}><i className="fa fa-arrow-left back-icon" aria-hidden="true"></i> back</button>
        <h2 className="recipe-title">{this.state.drink__strDrink}</h2>
        <div className="ingredients">
          <h4>Ingredients</h4>
          <ul className="ingredients-list">
            <li>{this.state.drink__strIngredient1} {this.state.drink__strMeasure1}</li>
            <li>{this.state.drink__strIngredient2} {this.state.drink__strMeasure2}</li>
            <li>{this.state.drink__strIngredient3} {this.state.drink__strMeasure3}</li>
            <li>{this.state.drink__strIngredient4} {this.state.drink__strMeasure4}</li>
            <li>{this.state.drink__strIngredient5} {this.state.drink__strMeasure5}</li>
            <li>{this.state.drink__strIngredient6} {this.state.drink__strMeasure6}</li>
            <li>{this.state.drink__strIngredient7} {this.state.drink__strMeasure7}</li>
            <li>{this.state.drink__strIngredient8} {this.state.drink__strMeasure8}</li>
          </ul>
        </div>
        <div id="recipe-drink-img" style={background}></div>
        <div className="mixing-instructions">
          <h4>Mixing Instructions</h4>
          <p>{this.state.drink__strInstructions}</p>
        </div>
      </main>
    );
  }
});
