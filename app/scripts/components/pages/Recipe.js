import React from 'react';
import _ from 'underscore';
import {hashHistory} from 'react-router';

import store from '../../store';

import Nav from '../Nav';
import SimilarDrinks from '../SimilarDrinks';
import UserModal from '../UserModal';
import Login from './Login';

export default React.createClass({
  getInitialState() {
    return {
      cocktail: '',
      favorite: false,
      bookmark: false,
      loggedIn: true
    };
  },
  sendBack() {
    hashHistory.push('/');
  },
  listener() {
    this.setState({cocktail: store.cocktails.get(this.props.params.cocktail).toJSON()});
    store.allIngredients.fetch({
      data: {
        query: JSON.stringify({
          drinkName: this.state.cocktail.drink__strDrink.toLowerCase()
        })
      },
      success: (data) => {
        let drinkName = data.models[0].get('drinkName');
        let flavors = data.models[0].get('tags');
        this.setState({tags: flavors})
        let index = Math.floor(Math.random() * flavors.length);
        store.allIngredients.fetch({
          data: {
            resolve: "drink",
            query: JSON.stringify({
              tags: flavors[index]
            })
          },
          success: (data) => {
            let resultsArr = [];
            function findRandomModels() {
              _(3).times(function getRandom () {
                let resultsIndex = Math.floor(Math.random() * data.models.length);
                let random = data.models[resultsIndex].get('drink')._obj;
                if (resultsArr.indexOf(random) === -1 && random.drink__strDrink !== drinkName.toLowerCase()) {
                  resultsArr.push(random);
                } else {
                  getRandom();
                }
              });
            }
            findRandomModels();
            let resultIDs = [];
            resultsArr.forEach((result) => {
              resultIDs.push(result._id)
            });
            let unique = _.uniq(resultIDs);
            if (unique.length !== 3) {
              findRandomModels()
            } else {
              this.setState({
                similar: resultsArr
              });
            }
          }
        });
      }
    });
  },
  updateSaved() {
    store.favorites.forEach((drink) => {
      if (drink.get('drink')._id === this.props.params.cocktail) {
        if (drink.get('username') === store.session.get('username')) {
          console.log(drink.get('username') + ' ' + store.session.get('username'));
          this.setState({favorite: true, favoriteModel: drink});
        }
      }
    });
    store.savedForLaterCollection.forEach((drink) => {
      if (drink.get('drink')._id === this.props.params.cocktail) {
        if (drink.get('username') === store.session.get('username')) {
          console.log(store.session);
          console.log(drink.get('username') + ' ' + store.session.get('username'));
          this.setState({bookmark: true, bookmarkModel: drink});
        }
      }
    });
  },
  hideModal() {
    this.setState({loggedIn: true});
  },
  addFavorite() {
    if (localStorage.getItem('username') !== 'Anonymous') {
      this.setState({loggedIn: true});
      if (this.state.favorite) {
        this.state.favoriteModel.destroy({
          success: () => {
            this.setState({favorite: false});
          }
        });
      } else {
        let cocktail = store.cocktails.get(this.props.params.cocktail);
        store.favorites.favorite(cocktail, store.session);
      }
    } else {
      this.setState({loggedIn: false});
    }
  },
  addBookmark() {
    if (localStorage.getItem('username') !== 'Anonymous') {
      this.setState({loggedIn: true});
      if (this.state.bookmark) {
        this.state.bookmarkModel.destroy({
          success: () => {
            this.setState({bookmark: false});
          }
        });
      } else {
        let cocktail = store.cocktails.get(this.props.params.cocktail);
        store.savedForLaterCollection.bookmark(cocktail, store.session);
      }
    } else {
      this.setState({loggedIn: false});
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
    store.favorites.off('update', this.updateSaved);
    store.savedForLaterCollection.off('update', this.updateSaved);
  },
  componentWillReceiveProps(nextProps) {
    this.setState({cocktail: store.cocktails.get(nextProps.params.cocktail).toJSON()});
  },
  render() {
    let display;
    let heart;
    let background;
    let similarDrinks;
    let login;
    if (!this.state.loggedIn) {
      login = (<UserModal hideModal={this.hideModal}><Login hideModal={this.hideModal}/></UserModal>);
    }
    if (this.state.cocktail) {
      similarDrinks = (<SimilarDrinks similar={this.state.similar}/>);
      if (this.state.bookmark) {
        display = {
          color: '#FF3C38'
        }
      }
      if (this.state.favorite) {
        heart = (<i className="fa fa-heart favorite-icon" aria-hidden="true" onClick={this.addFavorite}></i>);
      } else {
        heart = (<i className="fa fa-heart-o favorite-icon" aria-hidden="true" onClick={this.addFavorite}></i>)
      }
      if (this.state.cocktail.drink__strDrinkThumb === null) {
        background = {
          backgroundImage: 'url(assets/images/Cocktail-icon.png)'
        };
      } else {
        background = {
          backgroundImage: 'url(' + this.state.cocktail.drink__strDrinkThumb + ')'
        }
      }
    }
    return(
      <main>
        <Nav/>
        <button id="back-btn" onClick={this.sendBack}><i className="fa fa-arrow-left back-icon" aria-hidden="true"></i> back</button>
        <h2 className="recipe-title">{this.state.cocktail.drink__strDrink}</h2>
        <div id="recipe-drink-img" style={background}>
          <div id="recipe-icons">
            <i className="fa fa-bookmark bookmark-icon" aria-hidden="true" style={display} onClick={this.addBookmark}></i>
            {heart}
          </div>
        </div>
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
        <div className="mixing-instructions">
          <h4>Mixing Instructions</h4>
          <p>{this.state.cocktail.drink__strInstructions}</p>
        </div>
        {similarDrinks}
        {login}
      </main>
    );
  }
});
