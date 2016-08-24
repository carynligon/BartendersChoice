import Backbone from 'backbone';

import settings from '../settings';

import Favorite from '../models/Favorite';

export default Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/appdata/${settings.appKey}/Favorites`,
  model: Favorite,
});
