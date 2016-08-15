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
    // if (this.state.drinks[0]) {
    //   let rangeArr = this.state.drinks.reduce((prev, curr, i) => {
    //     return Math.abs(curr[scoreNames[0]] - testScores[0]) <= 100;
    //   });
    //   console.log(rangeArr);
    // }
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
    let testScores = [];
    this.compareScores();
    if (this.state.personality) {
      console.log(this.state.results.personality_types.indexOf(personality_type.name === 'Rational'));
      traits = this.state.personality.personality_types.map((type, i) => {
        testScores.push({trait: type.personality_type.name, score: type.score});
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
