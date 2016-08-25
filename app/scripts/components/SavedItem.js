import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render() {
    let style;
    console.log(this.props);
    if (this.props.img !== null) {
      style = {
        backgroundImage: 'url(' + this.props.img + ')'
      };
    } else{
      style = {
        backgroundImage: 'url(assets/images/Cocktail-icon.png)'
      };
    }
    return (
      <li>
        <div className="saved-item-img" style={style}></div>
        <div className="saved-item-data">
          <h3>{this.props.name}</h3>
          <Link to={`recipe/${this.props.id}`}>View Recipe</Link>
        </div>
      </li>
    );
  }
})
