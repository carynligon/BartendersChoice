import _ from 'underscore';
import React from 'react';
import {Link} from 'react-router';

import store from '../../store';

export default React.createClass({
  getInitialState() {
    return {
      results: store.session.toJSON(),
      drinks: store.cocktails.toJSON()
    };
  },
  compareScores() {
    let matches = [];
    this.setState({
      results: store.session.toJSON(),
      drinks: store.cocktails.toJSON()
    })
    this.state.results.personality.personality_types.forEach((trait, i) => {
      let traitName = trait.personality_type.name;
      let score = trait.score;
      this.state.drinks.forEach((drink) => {
        if (Math.abs(drink[traitName] - score) <= 20) {
          matches.push(drink._id);
        }
      });
      let reducedMatch = matches.reduce((obj, curr) => {
        if (obj) {
          if (obj[curr]) {
            obj[curr] = obj[curr] + 1;
          } else {
            obj[curr] = 1;
          }
        }
        return obj;
      }, {});
      let fullMatches = _.pairs(reducedMatch).filter((drink) => {
        return drink[1] === _.max(reducedMatch);
      });
      if (i ===6) {
        let index = Math.floor(Math.random() * fullMatches.length);
        let drinkId = fullMatches[index][0];
        let drink = store.cocktails.get(drinkId);
        this.setState({
          matchedDrink: drink.toJSON(),
        });
      }
    });
  },
  componentDidMount() {
    store.session.on('change update', this.compareScores);
    store.cocktails.fetch();
  },
  componentWillUnmount() {
    store.session.off('change update', this.compareScores);
  },
  render() {
    store.slides.sendAnswers(store.session.get('assessment_id'));
    let traits;
    let drinkName;
    let drinkId;
    let drinkImg;
    let background;
    if (this.state.results.personality) {
      if (this.state.matchedDrink) {
        drinkName = this.state.matchedDrink.drink__strDrink;
        drinkId = this.state.matchedDrink._id;
        drinkImg = this.state.matchedDrink.drink__strDrinkThumb;
        traits = this.state.results.personality.personality_types.map((type, i) => {
          return (
            <li key={i}>
              <h5>{type.personality_type.name}</h5>
              <p>{type.personality_type.description}</p>
              <p>{type.score}</p>
            </li>
          );
        });
        if (drinkImg === null) {
          background = {
            backgroundImage: 'url(assets/images/Cocktail-icon.png)'
          };
        } else {
          background = {
            backgroundImage: 'url(' + drinkImg + ')'
          }
        }
      }
    }
    return (
      <section id="results-section">
        <h3>Your Drink: {drinkName}</h3>
        <div id="drink-image-results" style={background}></div>
        <ul>
          {traits}
        </ul>
        <Link to={`recipe/${drinkId}`}>Learn how to make this drink!</Link>
      </section>
    );
  }
});
