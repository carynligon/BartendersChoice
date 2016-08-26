import _ from 'underscore';
import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  getInitialState() {
    return {showing: true}
  },
  closeModal() {
    this.setState({showing: false});
  },
  containerStyles: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'rgba(0,0,0,.5)'
  },
  contentStyles: {
    background: 'white',
    width: '500px',
    margin: '0 auto',
    height: '60vh',
    marginTop: '12.5%',
    overflow: 'scroll'
  },
  render() {
    console.log(this.props);
    let containerStyles;
    let contentStyles;
    if (this.state.showing === true) {
      containerStyles = this.containerStyles;
      contentStyles = this.contentStyles;
    } else {
      containerStyles = {display: 'none'};
      contentStyles = {display: 'none'};
    }

    return (
      <div className="modal-container" style={containerStyles} onClick={this.closeModal}>
        <div className="modal-content" style={contentStyles}>
          <h3>{this.props.name}</h3>
          <Link id="new-recipe-link" to={`recipe/${this.props.id}`}>Click to see your recipe</Link>
        </div>
      </div>
    );
  }
})
