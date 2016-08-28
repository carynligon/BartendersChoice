import React from 'react';
import {Link} from 'react-router';

import EditCocktail from './EditCocktail';

export default React.createClass({
  getInitialState() {
    return {showModal: false}
  },
  hideModal() {
    this.setState({showModal: false})
  },
  editCocktail() {
    this.setState({showModal: true})
  },
  render() {
    let modal;
    if (this.state.showModal) {
      modal = (<EditCocktail id={this.props.id} name={this.props.name} hideModal={this.hideModal}/>);
    }
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
      editbtn = (<input type="button" id="edit-btn" value="edit" onClick={this.editCocktail}/>)
    }
    return (
      <li>
        <div className="saved-item-img" style={style}></div>
        <div className="saved-item-data">
          <h3>{this.props.name}</h3>
          <Link to={`recipe/${this.props.id}`}>View Recipe</Link>
          {editbtn}
        </div>
        {modal}
      </li>
    );
  }
})
