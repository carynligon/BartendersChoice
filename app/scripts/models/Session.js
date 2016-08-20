import $ from 'jquery';
import Backbone from 'backbone';
import {hashHistory} from 'react-router';

import settings from '../settings';
import store from '../store';

export default Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/user/${settings.appKey}/login`,
  defaults: {
    username: ''
  },
  parse: function(response) {
    if (response) {
      return {
        authtoken: response._kmd.authtoken,
        username: response.username,
        firstName: response.firstName,
        lastName: response.lastName,
        userId: response._id
      };
    }
  },
  retrieve: function() {
      this.fetch({
          url: `https://baas.kinvey.com/user/${settings.appKey}/_me`,
      });
  },
  login: function(username, password) {
    localStorage.clear();
    store.session.save({
      username: username,
      password: password
    }, {
      success: function(model, response) {
        window.localStorage.setItem('authtoken', response._kmd.authtoken);
        window.localStorage.setItem('username', response.username);
        window.localStorage.setItem('ofAge', true);
        model.unset('password');
        store.session.set({
          username: username,
          authtoken: response._kmd.authtoken,
          ofAge: true
        });
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
  signup: function(firstName, lastName, username, password, email) {
    localStorage.clear();
    store.users.create({
      username: username,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName
    }, {
      success: function(response) {
        console.log(response);
        window.localStorage.setItem('authtoken', response.get('_kmd').authtoken);
        window.localStorage.setItem('username', response.get('username'));
        response.unset('password');
        store.session.set({
          username: username,
          authtoken: response.get('_kmd').authtoken
        });
      },
      error: function(response) {
        console.log('error: ' + response);
      }
    });
  },
  logout: function() {
    this.save(null, {
      url: `https://baas.kinvey.com/user/${settings.appKey}/_logout`});
    this.clear();
    localStorage.clear();
    store.session.save({
      username: 'Anonymous',
      password: '1234',
      ofAge: true
    }, {
      success: function(data) {
        localStorage.setItem('authtoken', data.get('authtoken'));
        store.session.set({
          username: 'Anonymous',
          password: '1234',
          ofAge: true
        });
        localStorage.setItem('username', 'Anonymous');
      }
    });
    hashHistory.push('/');
  }
});
