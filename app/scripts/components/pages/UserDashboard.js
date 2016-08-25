import React from 'react';

import store from '../../store';
import Nav from '../Nav';

import SavedItem from '../SavedItem';

export default React.createClass({
  getInitialState() {
    return {selected: 'All'}
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
  setAll() {
    this.setState({selected: 'All'});
  },
  setFavorites() {
    this.setState({selected: 'Favorites'});
  },
  setBookmarks() {
    this.setState({selected: 'Saved'});
  },
  componentDidMount() {
    store.favorites.on('update', this.updateFavorites);
    store.savedForLaterCollection.on('update', this.updateBookmarks);
    store.favorites.fetch({
      data: {
        "resolve": "drink",
        "userId": store.session.get('userId')
      }
    });
    store.savedForLaterCollection.fetch({
      data: {
        "resolve": "drink",
        "userId": store.session.get('userId')
      }
    });
  },
  componentWillUnmount() {
    store.favorites.off('update', this.updateFavorites);
    store.savedForLaterCollection.off('update', this.updateBookmarks);
  },
  render() {
    console.log(this.state);
    let savedItems;
    let viewAll;
    let viewFavorites;
    let viewBookmarks;
    if (this.state.selected === 'All' && this.state.favorites) {
      viewAll = (<li style={{background:'#FF3C38', color:'#fff'}} onClick={this.setAll}>All</li>);
      viewFavorites = (<li onClick={this.setFavorites}>Favorites</li>);
      viewBookmarks = (<li onClick={this.setBookmarks}>Saved</li>);
      savedItems = this.state.favorites.concat(this.state.bookmarks).map((drink, i) => {
        return (<SavedItem name={drink.drink._obj.drink__strDrink} img={drink.drink._obj.drink__strDrinkThumb} id={drink.drink._obj._id} key={i}/>);
      });
    } else if (this.state.selected === 'Favorites' && this.state.favorites) {
      viewFavorites = (<li style={{background:'#FF3C38', color:'#fff'}} onClick={this.setFavorites}>Favorites</li>);
      viewAll = (<li onClick={this.setAll}>All</li>);
      viewBookmarks = (<li onClick={this.setBookmarks}>Saved</li>);
      savedItems = this.state.favorites.map((drink, i) => {
        return (<SavedItem name={drink.drink._obj.drink__strDrink} img={drink.drink._obj.drink__strDrinkThumb} id={drink.drink._obj._id} key={i}/>);
      });
    } else if (this.state.selected === 'Saved' && this.state.bookmarks) {
      viewBookmarks = (<li style={{background:'#FF3C38', color:'#fff'}} onClick={this.setBookmarks}>Saved</li>);
      viewAll = (<li onClick={this.setAll}>All</li>);
      viewFavorites = (<li onClick={this.setFavorites}>Favorites</li>);
      savedItems = this.state.bookmarks.map((drink, i) => {
        return (<SavedItem name={drink.drink._obj.drink__strDrink} img={drink.drink._obj.drink__strDrinkThumb} id={drink.drink._obj._id} key={i}/>);
      });
    }
    return (
      <main id="dashboard-page">
        <Nav/>
        <section id="dashboard">
          <ul id="select-view">
            {viewAll}
            {viewBookmarks}
            {viewFavorites}
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
