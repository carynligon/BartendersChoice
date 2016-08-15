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
        store.session.set('assessment_id', assessment_id);
        store.slides.getSlides(assessment_id)
      }
    });
  }
});
