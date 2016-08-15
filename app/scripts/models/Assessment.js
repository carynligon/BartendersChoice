import Backbone from 'backbone';

import store from '../store';
import settings from '../settings';

export default Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/rpc/${settings.appKey}/custom/new-assessment`,
  newAssessment: function() {
    this.save({"deck_id": "core"}, {
      success: (model, data) => {
        store.session.set({assessment_id: data.id});
      }
    });
  }
});
