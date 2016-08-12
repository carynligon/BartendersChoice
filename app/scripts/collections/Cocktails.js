import Backbone from 'backbone';

import settings from '../settings';
import Cocktail from '../models/Cocktail';

export default Backbone.Collection.extend({
  url: `https://baas.kinvey.com/appdata/${settings.appKey}/Cocktails`,
  model: Cocktail
});
