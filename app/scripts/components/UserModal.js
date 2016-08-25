import React from 'react';
import {Link, hashHistory} from 'react-router';
import _ from 'underscore';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return{windowWidth: window.innerWidth};
  },
  handleResize() {
    this.setState({windowWidth: window.innerWidth});
  },
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  },
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  closeModal(e) {
    if (e.target.className === 'modal-container') {
      this.props.hideModal();
    }
  },
  render() {
    console.log(this.props);
    let containerStyles = {
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: 'rgba(0,0,0,.5)'
    };
    let contentStyles;
    if (this.state.windowWidth <= 500) {
      contentStyles = {
        background: 'white',
        width: '280px',
        height: '40vh',
        margin: '0 auto'
      };
    } else {
      contentStyles = {
        background: 'white',
        width: '500px',
        margin: '0 auto',
        height: '60vh',
        marginTop: '12.5%',
        overflow: 'scroll'
      };
    }
    return(
      <div className="modal-container" style={containerStyles} onClick={this.closeModal}>
        <div className="modal-content" style={contentStyles}>
          {this.props.children}
        </div>
      </div>
    );
  }
});
