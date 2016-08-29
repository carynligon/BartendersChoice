import React from 'react';
import {hashHistory} from 'react-router';

export default React.createClass({
  render() {
    return (
      <div id="filter-alcohol-wrapper">
        <h6>Alcohol</h6>
        <form id="alcohol-list-1">
            <input type="radio" name="alcohol" id="bourbon" onChange={this.filterAlcohol}/>
            <label htmlFor="bourbon">Bourbon</label>
            <input type="radio" name="alcohol" id="rye" onChange={this.filterAlcohol}/>
            <label htmlFor="rye">Rye</label>
            <input type="radio" name="alcohol" id="tequila" onChange={this.filterAlcohol}/>
            <label htmlFor="tequila">Tequila</label>
            <input type="radio" name="alcohol" id="gin" onChange={this.filterAlcohol}/>
            <label htmlFor="gin">Gin</label>
            <input type="radio" name="alcohol" id="vodka" onChange={this.filterAlcohol}/>
            <label htmlFor="vodka">Vodka</label>
            <input type="radio" name="alcohol" id="scotch" onChange={this.filterAlcohol}/>
            <label htmlFor="scotch">Scotch</label>
            <input type="radio" name="alcohol" id="other" onChange={this.clearAll}/>
            <label htmlFor="other" name="alcohol">Other</label>
        </form>
      </div>
    );
  }
});
