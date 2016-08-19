import React from 'react';
import {hashHistory} from 'react-router';

export default React.createClass({
  viewRecipe(e) {
    hashHistory.push(`/recipe/${e.target.parentElement.parentElement.id}`);
  },
  render() {
    let styles = {
      backgroundImage: 'url(' + this.props.img + ')'
    }
    return (
      <li className="drink-preview" id={this.props.id} onClick={this.viewRecipe}>
        <div className="drink-img" style={styles}>
          <h4>{this.props.name}</h4>
        </div>
      </li>
    );
  }
});
