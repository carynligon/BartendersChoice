import React from 'react';
import {hashHistory} from 'react-router';

import store from '../../store';

export default React.createClass({
  getInitialState() {
    return {
      index: 0
    }
  },
  nextQuestion(e) {
    let model = store.slides.get(this.props.params.id);
    let currIndex = this.state.question.position - 1;
    console.log(currIndex);
    if (currIndex === 48) {
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
      hashHistory.push('/assessment/results/')
    } else {
      hashHistory.push(`assessment/question/${store.slides.models[currIndex + 1].get('id')}`);
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
    }
    this.setState({index: this.state.index + 1});
  },
  updateSlides() {
    this.setState({question: store.slides.get(this.props.params.id).toJSON()})
  },
  componentDidMount() {
    store.slides.on('update', this.updateSlides);
    store.slides.getSlides(store.session.get('assessment_id'));
    if (store.slides.get(this.props.params.id)) {
      this.setState({question: store.slides.get(this.props.params.id).toJSON()})
    }
  },
  componentWillReceiveProps(nextProps) {
    this.setState({question: store.slides.get(nextProps.params.id).toJSON()})
  },
  render() {
    console.log(store.session);
    console.log(this.props.params);
    console.log(this.state);
    let question;
    if (this.state.question) {
      question = this.state.question.question;
    }
    return(
      <section id="question-section">
        <h3>{question}</h3>
        <div id="select-answer">
          <div id="me" onClick={this.nextQuestion}>ME</div>
          <div id="not-me" onClick={this.nextQuestion}>NOT ME</div>
        </div>
      </section>
    );
  }
});
