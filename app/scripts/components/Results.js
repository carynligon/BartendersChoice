import _ from 'underscore';
import React from 'react';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return {
      results: store.session.toJSON(),
      drinks: store.cocktails.toJSON()
    };
  },
  compareScores() {
    let matches = [];
    this.state.results.personality.personality_types.forEach((trait) => {
      let traitName = trait.personality_type.name;
      console.log(traitName);
      let score = trait.score;
      console.log(score);
      this.state.drinks.forEach((drink) => {
        if (Math.abs(drink[traitName] - score) <= 10) {
          matches.push(drink);
        }
      });
      console.log(matches);
      let counter = 1;
      function sliceMatch(drink) {
        let index = matches.indexOf(drink);
        matches.slice(index, 1);
        counter ++;
      }
      matches.forEach((drink) => {
        sliceMatch(drink);
        if (counter === 7) {
          console.log(drink);
        }
        if (matches.indexOf(drink) !== -1) {
          sliceMatch(drink);
        }
      });
      // let reducedMatch = matches.filter((drink) => {
      //   if (prev.drink_strDrink === curr.drink_strDrink)
      // };
      // console.log(reducedMatch);
    });
  },
  listener() {
    this.setState({
      results: store.session.toJSON(),
      drinks: store.cocktails.toJSON()
    });
  },
  componentDidMount() {
    store.session.on('change update', this.listener);
    store.cocktails.fetch();
  },
  componentWillUnmount() {
    store.session.off('change update', this.listener);
  },
  render() {
    store.slides.sendAnswers(store.session.get('assessment_id'));
    console.log(this.state);
    let traits;
    if (this.state.results.personality) {
      this.compareScores();
      traits = this.state.results.personality.personality_types.map((type, i) => {
        return (
          <li key={i}>
            <h5>{type.personality_type.name}</h5>
            <p>{type.personality_type.description}</p>
            <p>{type.score}</p>
          </li>
        );
      });
    }
    return (
      <section id="results-section">
        <ul>
          {traits}
        </ul>
      </section>
    );
  }
});
