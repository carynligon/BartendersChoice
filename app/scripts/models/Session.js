import Backbone from 'backbone';

import settings from '../settings';

export default Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/user/${settings.appKey}/login`,
  defaults: {
    username: '',
    age: 23
  },
});
