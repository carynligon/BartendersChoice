import React from 'react';
import {hashHistory} from 'react-router';

import store from '../../store';
import Nav from '../Nav';

export default React.createClass({
  getInitialState() {
    return {
      cocktail: '',
      favorite: false,
      bookmark: false
    };
  },
  sendBack() {
    hashHistory.push('/');
  },
  listener() {
    this.setState({cocktail: store.cocktails.get(this.props.params.cocktail).toJSON()});
  },
  updateSaved() {
    store.favorites.forEach((drink) => {
      if (drink.get('drink')._id === this.props.params.cocktail) {
        if (drink.get('userId') === store.session.get('userId')) {
          this.setState({favorite: true, favoriteModel: drink});
        }
      }
    });
    store.savedForLaterCollection.forEach((drink) => {
      if (drink.get('drink')._id === this.props.params.cocktail) {
        if (drink.get('userId') === store.session.get('userId')) {
          this.setState({bookmark: true, bookmarkModel: drink});
        }
      }
    });
  },
  addFavorite() {
    if (this.state.favorite) {
      console.log(this.state);
      this.state.favoriteModel.destroy({
        success: () => {
          this.setState({favorite: false});
        }
      });
    } else {
      let cocktail = store.cocktails.get(this.props.params.cocktail);
      store.favorites.favorite(cocktail, store.session);
    }
  },
  addBookmark() {
    if (this.state.bookmark) {
      console.log(this.state);
      this.state.bookmarkModel.destroy({
        success: () => {
          this.setState({bookmark: false});
        }
      });
    } else {
      let cocktail = store.cocktails.get(this.props.params.cocktail);
      store.savedForLaterCollection.bookmark(cocktail, store.session);
    }
  },
  componentDidMount() {
    store.cocktails.on('update', this.listener);
    store.favorites.on('update', this.updateSaved);
    store.savedForLaterCollection.on('update', this.updateSaved);
    store.cocktails.getCocktails();
    store.favorites.fetch();
    store.savedForLaterCollection.fetch();
  },
  componentWillUnmount() {
    store.cocktails.off('update', this.listener);
  },
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({cocktail: store.cocktails.get(nextProps.params.cocktail).toJSON()});
  },
  render() {
    let display;
    if (this.state.bookmark) {
      display = {
        color: '#FF3C38'
      }
    } else {
      display = {
        color: '#454545'
      };
    }
    let heart;
    if (this.state.favorite) {
      heart = (<i className="fa fa-heart favorite-icon" aria-hidden="true" onClick={this.addFavorite}></i>);
    } else {
      heart = (<i className="fa fa-heart-o favorite-icon" aria-hidden="true" onClick={this.addFavorite}></i>)
    }
    console.log(this.state);
    let background;
    if (this.state.cocktail.drink__strDrinkThumb === null) {
      background = {
        backgroundImage: 'url(assets/images/Cocktail-icon.png)'
      };
    } else {
      background = {
        backgroundImage: 'url(' + this.state.cocktail.drink__strDrinkThumb + ')'
      }
    }
    return(
      <main>
        <Nav/>
        <button id="back-btn" onClick={this.sendBack}><i className="fa fa-arrow-left back-icon" aria-hidden="true"></i> back</button>
        <h2 className="recipe-title">{this.state.cocktail.drink__strDrink}</h2>
        <div className="ingredients">
          <h4>Ingredients</h4>
          <ul className="ingredients-list">
            <li>{this.state.cocktail.drink__strIngredient1} {this.state.cocktail.drink__strMeasure1}</li>
            <li>{this.state.cocktail.drink__strIngredient2} {this.state.cocktail.drink__strMeasure2}</li>
            <li>{this.state.cocktail.drink__strIngredient3} {this.state.cocktail.drink__strMeasure3}</li>
            <li>{this.state.cocktail.drink__strIngredient4} {this.state.cocktail.drink__strMeasure4}</li>
            <li>{this.state.cocktail.drink__strIngredient5} {this.state.cocktail.drink__strMeasure5}</li>
            <li>{this.state.cocktail.drink__strIngredient6} {this.state.cocktail.drink__strMeasure6}</li>
            <li>{this.state.cocktail.drink__strIngredient7} {this.state.cocktail.drink__strMeasure7}</li>
            <li>{this.state.cocktail.drink__strIngredient8} {this.state.cocktail.drink__strMeasure8}</li>
          </ul>
        </div>
        <div id="recipe-drink-img" style={background}>
          <i className="fa fa-bookmark bookmark-icon" aria-hidden="true" style={display} onClick={this.addBookmark}></i>
          {heart}
        </div>
        <div className="mixing-instructions">
          <h4>Mixing Instructions</h4>
          <p>{this.state.cocktail.drink__strInstructions}</p>
        </div>
      </main>
    );
  }
});
