import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router';

import router from './router';
import store from './store';

ReactDOM.render(router, document.getElementById('container'));

if (store.session.get('age') < 21) {
  hashHistory.push('/confirm');
}
