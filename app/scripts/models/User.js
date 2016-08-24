import Backbone from 'backbone';

import settings from '../settings';

export default Backbone.Model.extend({
  url: `https://baas.kinvey.com/user/${settings.appKey}`,
  idAttribute: '_id',
  defaults: {
    username: '',
    authtoken: ''
  },
});
