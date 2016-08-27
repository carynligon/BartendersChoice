import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render() {
    let style;
    if (this.props.img !== null && this.props.img !== undefined) {
      style = {
        backgroundImage: 'url(' + this.props.img + ')'
      };
    } else{
      style = {
        backgroundImage: 'url(assets/images/Cocktail-icon.png)'
      };
    }
    let editbtn;
    if (this.props.edit) {
      editbtn = (<input type="button" id="edit-btn" value="edit"/>)
    }
    return (
      <li>
        <div className="saved-item-img" style={style}></div>
        <div className="saved-item-data">
          <h3>{this.props.name}</h3>
          <Link to={`recipe/${this.props.id}`}>View Recipe</Link>
          {editbtn}
        </div>
      </li>
    );
  }
})
