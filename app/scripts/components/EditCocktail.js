import React from 'react';

import store from '../store';

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
    if (this.state.ingredients) {
      ingredients = this.state.ingredients.map((ingredient,i) => {
        return (
          <li className="cocktail-ingredient" key={i}>
            <input type="text" className="cocktail-ingredient-name" defaultValue={ingredient.ingredientName}></input>
            <input type="text" className="cocktail-ingredient-quantity" defaultValue={ingredient.quantity}></input>
          </li>
        )
      });
      this.state.ingredients.forEach((ingredient) => {
        ingredient.tags.forEach((tag) => {
          let id = 'custom-' + tag;
          document.getElementById(id).checked = true;
        });
      });
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
        <form id="edit-cocktail-form">
          <input type="text" id="cocktail-name" defaultValue={this.props.name}></input>
          <div id="cocktail-image" style={styles}></div>
          <input type="file" id="image-uploader" accept="image/*" ref="file" onChange={this.uploadImg}/>
          <input type="range" id="cocktail-difficulty" min="1" max="3"/>
          <input type="text" id="cocktail-instructions" defaultValue={this.state.cocktail.drink__strInstructions}></input>
          <input type="text" id="cocktail-glass" defaultValue={this.state.cocktail.drink__strGlass}></input>
          <ul id="cocktail-ingredients">
            {ingredients}
          </ul>
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
          <input type="submit" id="submit-changes-btn" value="Submit"/>
        </form>
        </div>
      </div>
    );
  }
});
