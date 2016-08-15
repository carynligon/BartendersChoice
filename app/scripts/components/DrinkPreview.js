import React from 'react';

export default React.createClass({
  render() {
    return (
      <li className="drink-preview" id={this.props.id}>
        <img src={this.props.img}/>
        <h4>{this.props.name}</h4>
      </li>
    );
  }
});
