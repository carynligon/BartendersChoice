import Backbone from 'backbone';

export default Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/appdata/${settings.appKey}/Cocktails`,
  idAttribute: '_id'
});
