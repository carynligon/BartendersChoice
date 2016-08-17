import Backbone from 'backbone';

import settings from '../settings';

import User from '../models/User';

export default Backbone.Collection.extend({
  url: `https://baas.kinvey.com/user/${settings.appKey}`,
  model: User
});
