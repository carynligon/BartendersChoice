import $ from 'jquery';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router';
import _ from 'underscore';

import router from './router';
import store from './store';
import settings from './settings';

$(document).ajaxSend(function(evt, xhrAjax, jqueryAjax) {
  if (jqueryAjax.url.indexOf('kinvey') !== -1) {
    if (localStorage.getItem('authtoken')) {
      xhrAjax.setRequestHeader('Authorization', 'Kinvey ' + localStorage.getItem('authtoken'));
    } else {
      xhrAjax.setRequestHeader('Authorization', 'Basic ' + settings.basicAuth);
    }
  }
});

ReactDOM.render(router, document.getElementById('container'));

store.users.fetch();

if (localStorage.getItem('authtoken') && localStorage.getItem('username') !== 'Anonymous') {
  store.session.retrieve();
} else if (!localStorage.getItem('ofAge')){
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
  hashHistory.push('/confirm');
} else {
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
}
