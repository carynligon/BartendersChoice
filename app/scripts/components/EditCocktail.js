import React from 'react';

import store from '../store';

import CustomForm from './CustomForm';

export default React.createClass({
  getInitialState() {
    return {cocktail: store.cocktails.get(this.props.id).toJSON()}
  },
  closeModal(e) {
    if (e.target.className === 'modal-container') {
      this.props.hideModal();
    }
  },
  updateIngredients() {
    this.setState({ingredients: store.allIngredients.toJSON()});
  },
  changeStatus() {

  },
  componentDidMount() {
    store.allIngredients.on('update', this.updateIngredients);
    store.allIngredients.fetch({
      data: {
        "resolve": "drink",
        "query": JSON.stringify({
          "drinkName": this.props.name
        })
      }
    });
  },
  componentWillUnmount() {
    store.allIngredients.off('update', this.updateIngredients);
  },
  render() {
    console.log(this.state);
    let containerStyles = {
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 10,
      background: 'rgba(0,0,0,.5)'
    };
    let contentStyles = {
        background: 'white',
        width: '500px',
        margin: '0 auto',
        height: '60vh',
        marginTop: '12.5%',
        overflow: 'scroll'
      };
    let ingredients;
    let form;
    if (this.state.ingredients) {
      ingredients = this.state.ingredients.map((ingredient,i) => {
        return (
          <li className="cocktail-ingredient" key={i}>
            <input type="text" className="cocktail-ingredient-name" defaultValue={ingredient.ingredientName}></input>
            <input type="text" className="cocktail-ingredient-quantity" defaultValue={ingredient.quantity}></input>
          </li>
        )
      });
      form = (<CustomForm name={this.props.name} cocktail={this.state.cocktail} img={this.state.cocktail.drink__strDrinkThumb} instructions={this.state.cocktail.drink__strInstructions} glass={this.state.cocktail.drink__strGlass} ingredients={this.state.ingredients}/>);
    }
    let styles;
    if (this.state.cocktail.drink__strDrinkThumb === null || this.state.cocktail.drink__strDrinkThumb === undefined) {
      styles = {
        backgroundImage: 'url(assets/images/Cocktail-icon.png)'
      }
    } else {
      styles = {
        backgroundImage: 'url(' + this.state.cocktail.drink__strDrinkThumb + ')'
      }
    }
    return (
      <div className="modal-container" style={containerStyles} onClick={this.closeModal}>
        <div className="modal-content" style={contentStyles}>
          {form}
        </div>
      </div>
    );
  }
});
