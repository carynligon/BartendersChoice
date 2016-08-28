import React from 'react';
import _ from 'underscore';

import store from '../../store';
import Nav from '../Nav';

import SavedItem from '../SavedItem';

export default React.createClass({
  getInitialState() {
    return {
      selected: 'All',
      bookmarks: [],
      custom: [],
      favorites: []
    }
  },
  logout() {
    store.session.logout();
  },
  updateFavorites() {
    this.setState({favorites: store.favorites.toJSON()});
  },
  updateBookmarks() {
    this.setState({bookmarks: store.savedForLaterCollection.toJSON()});
  },
  updateYours() {
    console.log(store.allIngredients);
    this.setState({custom: store.allIngredients.toJSON()});
  },
  setAll() {
    this.setState({selected: 'All'});
  },
  setFavorites() {
    this.setState({selected: 'Favorites'});
  },
  setBookmarks() {
    this.setState({selected: 'Saved'});
  },
  setYours() {
    this.setState({selected: 'Yours'});
  },
  setSession() {
    this.setState({username: store.session.get('username')});
  },
  componentDidMount() {
    store.favorites.on('update', this.updateFavorites);
    store.savedForLaterCollection.on('update', this.updateBookmarks);
    store.allIngredients.on('update', this.updateYours);
    this.setSession();
    store.session.on('change', this.setSession);
    store.favorites.fetch({
      data: {
        "resolve": "drink",
        "query": JSON.stringify({
          "username": this.state.username
        })
      }
    });
    store.savedForLaterCollection.fetch({
      data: {
        "resolve": "drink",
        "query": JSON.stringify({
          "username": this.state.username
        })
      }
    });
    store.allIngredients.fetch({
      data: {
        "resolve": "drink",
        "query": JSON.stringify({
          "submittedBy": this.state.username
        })
      }
    });
  },
  componentWillUnmount() {
    store.favorites.off('update', this.updateFavorites);
    store.savedForLaterCollection.off('update', this.updateBookmarks);
    store.allIngredients.off('update', this.updateYours);
  },
  render() {
    let savedItems;
    let viewAll;
    let viewFavorites;
    let viewBookmarks;
    let viewYours;
    if (this.state.username) {
      if (this.state.selected === 'All' && this.state.favorites !== [] && this.state.bookmarks !== []) {
        viewAll = (<li style={{background:'#FF3C38', color:'#fff'}} onClick={this.setAll}>All</li>);
        viewFavorites = (<li onClick={this.setFavorites}>Favorites</li>);
        viewBookmarks = (<li onClick={this.setBookmarks}>Saved</li>);
        viewYours = (<li onClick={this.setYours}>Your Recipes</li>);
        savedItems = this.state.favorites.concat(this.state.bookmarks).map((drink, i) => {
          if (drink.username === this.state.username) {
            return (<SavedItem name={drink.drinkName} img={drink.drink._obj.drink__strDrinkThumb} id={drink.drink._id} key={i}/>);
          }
        });
      } else if (this.state.selected === 'Favorites' && this.state.favorites !== []) {
        viewFavorites = (<li style={{background:'#FF3C38', color:'#fff'}} onClick={this.setFavorites}>Favorites</li>);
        viewAll = (<li onClick={this.setAll}>All</li>);
        viewBookmarks = (<li onClick={this.setBookmarks}>Saved</li>);
        viewYours = (<li onClick={this.setYours}>Your Recipes</li>);
        savedItems = this.state.favorites.map((drink, i) => {
          if (drink.username === this.state.username) {
            return (<SavedItem name={drink.drinkName} img={drink.drink._obj.drink__strDrinkThumb} id={drink.drink._obj._id} key={i}/>);
          }
        });
      } else if (this.state.selected === 'Saved' && this.state.bookmarks !== []) {
        viewBookmarks = (<li style={{background:'#FF3C38', color:'#fff'}} onClick={this.setBookmarks}>Saved</li>);
        viewAll = (<li onClick={this.setAll}>All</li>);
        viewFavorites = (<li onClick={this.setFavorites}>Favorites</li>);
        viewYours = (<li onClick={this.setYours}>Your Recipes</li>);
        savedItems = this.state.bookmarks.map((drink, i) => {
          if (drink.username === this.state.username) {
            return (<SavedItem name={drink.drinkName} img={drink.drink._obj.drink__strDrinkThumb} id={drink.drink._obj._id} key={i}/>);
          }
        });
      } else if (this.state.selected === 'Yours' && this.state.custom !== []) {
        viewBookmarks = (<li onClick={this.setBookmarks}>Saved</li>);
        viewAll = (<li onClick={this.setAll}>All</li>);
        viewFavorites = (<li onClick={this.setFavorites}>Favorites</li>);
        viewYours = (<li onClick={this.setYours} style={{background:'#FF3C38', color:'#fff'}}>Your Recipes</li>);
        let drinkArr = [];
        let reduced;
        let toReduce = this.state.custom.map((drink, i) => {
          if (drink.submittedBy) {
            console.log(drink);
            drinkArr.push(drink);
          }
          let ids = []
          reduced = drinkArr.reduce((rtsf, curr, i) => {
            if (i === 0 && curr.submittedBy === this.state.username) {
              rtsf.push(curr);
              ids.push(curr.drink._id);
              return rtsf;
            } else if (ids.indexOf(curr.drink._id) === -1 && curr.submittedBy === this.state.username && curr.drink._obj !== null) {
                rtsf.push(curr);
                ids.push(curr.drink._id);
                return rtsf;
              }
            console.log(rtsf);
            return rtsf;
          },[]);
          });
          savedItems = reduced.map((drink, i) => {
            console.log(drink);
            return (<SavedItem name={drink.drinkName} id={drink.drink._id} key={i} edit={true}/>);
          });
      }
    }
    return (
      <main id="dashboard-page">
        <Nav/>
        <section id="dashboard">
          <ul id="select-view">
            {viewAll}
            {viewBookmarks}
            {viewFavorites}
            {viewYours}
          </ul>
          <ul id="preview-selected-item">
            {savedItems}
          </ul>
        </section>
        <input type="button" value="logout" id="logout-btn" onClick={this.logout}/>
      </main>
    );
  }
});
