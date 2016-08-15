import $ from 'jquery';
import Backbone from 'backbone';

import store from '../store';
import settings from '../settings';

export default Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/rpc/${settings.appKey}/custom/new-assessment`,
  newAssessment: function() {
    this.save({"deck_id": "core"}, {
      success: (model, data) => {
        let assessment_id = data.id;
        console.log(assessment_id);
        $.ajax({
          url: `https://baas.kinvey.com/rpc/${settings.appKey}/custom/slides`,
          type: 'POST',
          data: {
            assessment_id: assessment_id
          },
          success: (data) => {
            data.forEach((question) => {
              store.slides.create(question)
            });
            hashHistory.push('/assessment/1');
          }
        });
      }
    });
  }
});
