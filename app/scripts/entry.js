import $ from 'jquery';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router';

import router from './router';
import store from './store';
import settings from './settings';

$(document).ajaxSend(function(evt, xhrAjax, jqueryAjax) {
    if (localStorage.getItem('authtoken')) {
      xhrAjax.setRequestHeader('Authorization', 'Kinvey ' + localStorage.getItem('authtoken'));
    } else {
      xhrAjax.setRequestHeader('Authorization', 'Basic ' + settings.basicAuth);
    }
});

ReactDOM.render(router, document.getElementById('container'));

if (localStorage.getItem('authtoken')) {
  store.session.retrieve();
} else {
  hashHistory.push('/confirm');
  store.session.save({
    username: 'Anonymous',
    password: '1234'
  }, {
    success: function(data) {
      localStorage.setItem('authtoken', data.get('authtoken'));
      localStorage.setItem('username', 'Anonymous');
    }
  });
}
