import React from 'react';
import {hashHistory} from 'react-router';

import store from '../../store';

export default React.createClass({
  getInitialState() {
    return {index: 0}
  },
  nextQuestion(e) {
    let model = store.slides.get(store.slides.models[this.state.index].get('id'));
    if (e.target.id === 'me') {
      model.set({
        result: {
          id: model.get('id'),
          response: true,
          time_taken: 900
        }
      });
    } else {
      model.set({
        result: {
          id: model.get('id'),
          response: false,
          time_taken: 900
        }
      });
    }
    if (this.state.index === 48) {
      hashHistory.push('/assessment/results/')
    }
    this.setState({index: this.state.index + 1});
  },
  render() {
    let currQuestion = store.slides.models[this.state.index];
    return(
      <section id="question-section">
        <h3>{currQuestion.get('question')}</h3>
        <div id="me" onClick={this.nextQuestion}>ME</div>
        <div id="not-me" onClick={this.nextQuestion}>NOT ME</div>
      </section>
    );
  }
});
