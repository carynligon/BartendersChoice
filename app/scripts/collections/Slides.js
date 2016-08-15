import Backbone from 'backbone';

import settings from '../settings';
import store from '../store';

import Slide from '../models/Slide';

export default Backbone.Collection.extend({
  model: 'Slide'
});
