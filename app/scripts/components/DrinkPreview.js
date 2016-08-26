import React from 'react';
import {hashHistory} from 'react-router';

import store from '../store';

import UserModal from './UserModal';
import Login from './pages/Login';

export default React.createClass({
  getInitialState() {
    return {
      bookmark: false,
      user: store.users.get(store.session.get('userId')),
      loggedIn: true
    };
  },
  viewRecipe(e) {
    hashHistory.push(`/recipe/${e.target.parentElement.parentElement.id}`);
  },
  showBookmark() {
    this.setState({bookmark: !this.state.bookmark});
  },
  addBookmark() {
    if (this.props.loggedIn) {
      this.setState({loggedIn: true});
      if (this.state.saveBookmark) {
        console.log(this.state);
        this.state.saveBookmarkModel.destroy({
          success: () => {
            this.setState({saveBookmark: false});
          }
        });
      } else {
        let cocktail = store.cocktails.get(this.props.id);
        store.savedForLaterCollection.bookmark(cocktail, store.session);
      }
    } else {
      this.setState({loggedIn: false});
    }
  },
  addFavorite() {
    if (this.props.loggedIn) {
      this.setState({loggedIn: true});
      if (this.state.saveFavorite) {
        console.log(this.state);
        this.state.saveFavoriteModel.destroy({
          success: () => {
            this.setState({saveFavorite: false});
          }
        });
      } else {
        let cocktail = store.cocktails.get(this.props.id);
        store.favorites.favorite(cocktail, store.session);
      }
    } else {
      this.setState({loggedIn: false});
    }
  },
  listener() {
    store.savedForLaterCollection.forEach((drink) => {
      if (drink.get('drink')._id === this.props.id) {
        if (drink.get('username') === store.session.get('username')) {
          this.setState({saveBookmark: true, saveBookmarkModel: drink});
        }
      }
    });
    store.favorites.forEach((drink) => {
      if (drink.get('drink')._id === this.props.id) {
        if (drink.get('username') === store.session.get('username')) {
          this.setState({saveFavorite: true, saveFavoriteModel: drink});
        }
      }
    });
  },
  hideModal() {
    this.setState({loggedIn: true});
  },
  componentDidMount() {
    store.savedForLaterCollection.on('update remove', this.listener);
    store.favorites.on('update remove', this.listener);
    store.savedForLaterCollection.fetch();
    store.favorites.fetch();
  },
  componentWillUnmount() {
    store.savedForLaterCollection.off('update remove', this.listener);
    store.favorites.off('update remove', this.listener);
    store.session.off('update remove', this.checkLogIn);
  },
  render() {
    let login;
    if (!this.state.loggedIn) {
      login = (<UserModal hideModal={this.hideModal}><Login hideModal={this.hideModal}/></UserModal>);
    }
    let styles;
    if (this.props.img !== null) {
      styles = {
        backgroundImage: 'url(' + this.props.img + ')'
      };
    } else {
      styles = {
        backgroundImage: 'url(assets/images/Cocktail-icon.png)'
      };
    }
    let display;
    if (this.state.bookmark) {
      display = {
        opacity: '1'
      };
    } else if (this.state.saveBookmark) {
      display = {
        opacity: '1',
        color: '#FF3C38'
      }
    } else {
      display = {
        opacity: '0'
      };
    }
    let heart;
    let icons;
    if (this.state.saveFavorite) {
      heart = (<i className="fa fa-heart favorite-icon" aria-hidden="true" onClick={this.addFavorite}></i>);
    } else {
      heart = (<i className="fa fa-heart-o favorite-icon" aria-hidden="true" onClick={this.addFavorite}></i>)
    }
    return (
      <li className="drink-preview" id={this.props.id} onMouseOver={this.showBookmark} onMouseOut={this.showBookmark}>
        <div className="drink-img" style={styles}>
          <i className="fa fa-bookmark bookmark-icon" aria-hidden="true" style={display} onClick={this.addBookmark}></i>
          {heart}
          <h4 onClick={this.viewRecipe}>{this.props.name}</h4>
        </div>
        {login}
      </li>
    );
  }
});
