import $ from 'jquery';
import Backbone from 'backbone';
import {hashHistory} from 'react-router';

import settings from '../settings';
import store from '../store';

import Slide from '../models/Slide';

export default Backbone.Collection.extend({
  model: Slide,
  getSlides: function(assessment_id) {
    $.ajax({
      url: `https://baas.kinvey.com/rpc/${settings.appKey}/custom/slides`,
      type: 'POST',
      data: {
        assessment_id: assessment_id
      },
      success: (data) => {
        console.log(data);
        data.forEach((question) => {
          this.add({
            id: question.id,
            position: question.position,
            question: question.caption
          });
        });
        hashHistory.push('/assessment/question');
      }
    });
  },
  sendAnswers: function(assessment_id) {
    let answerArr = [];
    store.slides.forEach((question) => {
      answerArr.push(question.get('result'));
    });
    console.log(answerArr);
    $.ajax({
      url: `https://baas.kinvey.com/rpc/${settings.appKey}/custom/send-answers`,
      type: 'POST',
      data: {
        answerArr: JSON.stringify(answerArr),
        assessment_id: assessment_id
      },
      success: (data) => {
        $.ajax({
          url: `https://baas.kinvey.com/rpc/${settings.appKey}/custom/results`,
          type: 'POST',
          data: {
            assessment_id: assessment_id
          },
          success: (data) => {
            store.session.set({
              personality: data
            });
          }
        });
      }
    });
  }
});
