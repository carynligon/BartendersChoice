import React from 'react';
import {hashHistory} from 'react-router';

export default React.createClass({
  viewRecipe(e) {
    hashHistory.push(`/recipe/${e.target.parentElement.id}`);
  },
  render() {
    return (
      <li className="drink-preview" id={this.props.id} onClick={this.viewRecipe}>
        <img src={this.props.img}/>
        <h4>{this.props.name}</h4>
      </li>
    );
  }
});
