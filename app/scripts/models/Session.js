import Backbone from 'backbone';

import settings from '../settings';

export default Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/user/${settings.appKey}/login`,
  defaults: {
    username: '',
    age: 23
  },
  parse: function(response) {
    if (response) {
      return {
        authtoken: response._kmd.authtoken,
        username: response.username,
        fullname: response.fullname,
        userId: response._id
      };
    }
  },
  retrieve: function() {
      this.fetch({
          url: `https://baas.kinvey.com/user/${settings.appKey}/_me`
      });
  },
  login: function(e, username, password) {
    localStorage.clear();
    e.preventDefault();
    store.session.save({
      username: username,
      password: password
    }, {
      success: function(model, response) {
        window.localStorage.setItem('authtoken', response._kmd.authtoken);
        window.localStorage.setItem('username', response.username);
        model.unset('password');
        store.session.set({
          username: username,
          password: password
        })
        hashHistory.push('/');
      },
      error: function(response) {
        document.getElementById('username').style.color = '#f32424';
        document.getElementById('password').style.color = '#f32424';
        document.getElementById('error-message').textContent = 'Invalid username or password';
        console.log('error: ' + response);
        localStorage.setItem('authtoken', settings.anonymousToken);
      }
    });
  },
  signup: function(e, firstName, lastName, username, password, email) {
    localStorage.clear();
    e.preventDefault();
    store.userCollection.create({
      username: username,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName
    }, {
      success: function(response) {
        console.log(response);
        window.localStorage.setItem('authtoken', response.get('authtoken'));
        window.localStorage.setItem('username', response.get('username'));
        response.unset('password');
        store.session.set({
          username: username,
        })
        hashHistory.push('/');
      },
      error: function(response) {
        console.log('error: ' + response);
        localStorage.setItem('authtoken', settings.anonymousToken);
      }
    });
  },
  logout: function() {
    this.save(null, {
      url: `https://baas.kinvey.com/user/${settings.appKey}/_logout`});
    this.clear();
    localStorage.clear();
    hashHistory.push('/');
    localStorage.setItem('authtoken', settings.anonymousToken);
  }
});
