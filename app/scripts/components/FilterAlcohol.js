import React from 'react';
import {hashHistory} from 'react-router';

export default React.createClass({
  getInitialState() {
    return {
      selected: []
    };
  },
  filterAlcohol(e) {
    console.dir(e.target)
    this.setState({selected: this.state.selected.push(e.target.id)});
  },
  render() {
    return (
      <div id="filter-alcohol-wrapper">
        <h6>Alcohol</h6>
        <form id="alcohol-list-1">
            <input type="radio" id="bourbon" onChange={this.filterAlcohol}/>
            <label htmlFor="bourbon">Bourbon</label>
            <input type="radio" id="rye" onChange={this.filterAlcohol}/>
            <label htmlFor="rye">Rye</label>
            <input type="radio" id="tequila" onChange={this.filterAlcohol}/>
            <label htmlFor="tequila">Tequila</label>
            <input type="radio" id="gin" onChange={this.filterAlcohol}/>
            <label htmlFor="gin">Gin</label>
            <input type="radio" id="vodka" onChange={this.filterAlcohol}/>
            <label htmlFor="vodka">Vodka</label>
            <input type="radio" id="scotch" onChange={this.filterAlcohol}/>
            <label htmlFor="scotch">Scotch</label>
        </form>
      </div>
    );
  }
});
