import React from 'react';
import {hashHistory} from 'react-router';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return {bookmark: false};
  },
  viewRecipe(e) {
    hashHistory.push(`/recipe/${e.target.parentElement.parentElement.id}`);
  },
  showBookmark() {
    this.setState({bookmark: !this.state.bookmark});
  },
  addBookmark() {
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
  },
  listener() {
    store.savedForLaterCollection.forEach((drink) => {
      if (drink.get('drink')._id === this.props.id) {
        console.log(drink);
        this.setState({saveBookmark: true, saveBookmarkModel: drink});
      }
    });
  },
  componentDidMount() {
    store.savedForLaterCollection.on('update remove', this.listener);
    store.savedForLaterCollection.fetch();
  },
  componentWillUnmount() {
    store.savedForLaterCollection.off('update remove', this.listener);
  },
  render() {
    console.log(this.state);
    let styles = {
      backgroundImage: 'url(' + this.props.img + ')'
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
    return (
      <li className="drink-preview" id={this.props.id} onMouseOver={this.showBookmark} onMouseOut={this.showBookmark}>
        <div className="drink-img" style={styles}>
          <i className="fa fa-bookmark bookmark-icon" aria-hidden="true" style={display} onClick={this.addBookmark}></i>
          <i className="fa fa-heart-o favorite-icon" aria-hidden="true"></i>
          <h4 onClick={this.viewRecipe}>{this.props.name}</h4>
        </div>
      </li>
    );
  }
});
