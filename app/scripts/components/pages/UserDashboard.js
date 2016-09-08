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
    console.log('session ran');
    if (store.session.get('username')) {
      store.favorites.fetch({
        data: {
          "resolve": "drink",
          "query": JSON.stringify({
            "username": store.session.get('username')
          })
        },
        success: (data) => {
          console.log(data);
          if (data.models[0].get('drink')._obj) {
            this.setState({favorites: data.toJSON()});
          }

        }
      });
      store.savedForLaterCollection.fetch({
        data: {
          "resolve": "drink",
          "query": JSON.stringify({
            "username": store.session.get('username')
          })
        },
        success: (data) => {
          console.log(data);
          if (data.models[0].get('drink')._obj) {
            this.setState({bookmarks: data.toJSON()});
          }

        }
      });
      store.allIngredients.fetch({
        data: {
          "resolve": "drink",
          "query": JSON.stringify({
            "submittedBy": store.session.get('username')
          })
        },
        success: (data) => {
          console.log(data);
          if (data.models[0].get('drink')._obj) {
            this.setState({custom: data.toJSON()});
          }

        }
      });

    }
  },
  componentDidMount() {
    this.setSession();
    store.session.on('change', this.setSession);
  },
  componentWillUnmount() {
    store.session.off('change', this.setSession);
  },
  render() {
    let savedItems;
    let viewAll;
    let viewFavorites;
    let viewBookmarks;
    let viewYours;
    if (store.session.get('username')) {
      if (this.state.selected === 'All' && this.state.favorites !== [] && this.state.bookmarks !== []) {
        viewAll = (<li style={{background:'#FF3C38', color:'#fff'}} onClick={this.setAll}>All</li>);
        viewFavorites = (<li onClick={this.setFavorites}>Favorites</li>);
        viewBookmarks = (<li onClick={this.setBookmarks}>Saved</li>);
        viewYours = (<li onClick={this.setYours}>Your Recipes</li>);
        let combined = this.state.favorites.concat(this.state.bookmarks);
        let dupsRemoved = [];
        let dupsRemovedIndex = [];
        let reduced = combined.reduce((rtsf, curr, i) => {
          if (dupsRemoved.indexOf(curr.drinkName) === -1) {
            dupsRemoved.push(curr.drinkName);
            dupsRemovedIndex.push(i);
          }
          return rtsf;
        }, []);
        let allSaved = [];
        dupsRemovedIndex.forEach((index) => {
          allSaved.push(this.state.favorites.concat(this.state.bookmarks)[index])
        })
        savedItems = allSaved.map((drink, i) => {
          return (<SavedItem name={drink.drinkName} img={drink.drink._obj.drink__strDrinkThumb} id={drink.drink._id} key={i}/>);
        });
      } else if (this.state.selected === 'Favorites' && this.state.favorites !== []) {
        viewFavorites = (<li style={{background:'#FF3C38', color:'#fff'}} onClick={this.setFavorites}>Favorites</li>);
        viewAll = (<li onClick={this.setAll}>All</li>);
        viewBookmarks = (<li onClick={this.setBookmarks}>Saved</li>);
        viewYours = (<li onClick={this.setYours}>Your Recipes</li>);
        savedItems = this.state.favorites.map((drink, i) => {
          return (<SavedItem name={drink.drinkName} img={drink.drink._obj.drink__strDrinkThumb} id={drink.drink._obj._id} key={i}/>);
        });
      } else if (this.state.selected === 'Saved' && this.state.bookmarks !== []) {
        viewBookmarks = (<li style={{background:'#FF3C38', color:'#fff'}} onClick={this.setBookmarks}>Saved</li>);
        viewAll = (<li onClick={this.setAll}>All</li>);
        viewFavorites = (<li onClick={this.setFavorites}>Favorites</li>);
        viewYours = (<li onClick={this.setYours}>Your Recipes</li>);
        savedItems = this.state.bookmarks.map((drink, i) => {
          return (<SavedItem name={drink.drinkName} img={drink.drink._obj.drink__strDrinkThumb} id={drink.drink._obj._id} key={i}/>);
        });
      } else if (this.state.selected === 'Yours' && this.state.custom !== []) {
        viewBookmarks = (<li onClick={this.setBookmarks}>Saved</li>);
        viewAll = (<li onClick={this.setAll}>All</li>);
        viewFavorites = (<li onClick={this.setFavorites}>Favorites</li>);
        viewYours = (<li onClick={this.setYours} style={{background:'#FF3C38', color:'#fff'}}>Your Recipes</li>);
        let drinkArr = [];
        let reduced = [];
        let toReduce = this.state.custom.map((drink, i) => {
          if (drink.submittedBy) {
            drinkArr.push(drink);
          }
          let ids = []
          reduced = drinkArr.reduce((rtsf, curr, i) => {
            if (i === 0) {
              rtsf.push(curr);
              ids.push(curr.drink._id);
              return rtsf;
            } else if (ids.indexOf(curr.drink._id) === -1 && curr.drink._obj !== null) {
                rtsf.push(curr);
                ids.push(curr.drink._id);
                return rtsf;
              }
            return rtsf;
          },[]);
          });
          savedItems = reduced.map((drink, i) => {
            return (<SavedItem name={drink.drinkName} img={drink.drink._obj.drink__strDrinkThumb} id={drink.drink._id} key={i} edit={true}/>);
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
        <button id="logout-btn" onClick={this.logout}>logout</button>
      </main>
    );
  }
});


// v7q3qogwwdij
// gv-54y2v6jrcdek3d.dv.googlehosted.com.
