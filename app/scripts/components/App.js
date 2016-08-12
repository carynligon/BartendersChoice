import $ from 'jquery';
import React from 'react';
import _ from 'underscore';

import settings from '../settings';
import store from '../store';

export default React.createClass({
  getInitialState() {
    return {}
  },
  componentDidMount() {
    store.cocktails.on('update', () => {
      this.setState(store.cocktails.toJSON());
    });
    store.cocktails.fetch();
  },
  render() {
    let data = _.toArray(this.state);
    data.
    store.session.save({
      username: 'admin',
      password: '1234'
    }, {
      success: (data) => {
        console.log(data);
        console.log(data.get('_kmd').authtoken);
        localStorage.setItem('authtoken', data.get('_kmd').authtoken);
      }
    });
      // $.ajax({
      //   url: `https://baas.kinvey.com/rpc/${settings.appKey}/custom/cocktails`,
      //   type: 'POST',
      //   success: (data) => {
      //     console.log(data);
      //     data.drinks.forEach((drink) => {
      //       store.cocktails.create({
      //         drink
      //       }, {
      //         success: (resp) => {
      //           console.log(resp);
      //         }
      //       });
      //     });
      //     console.log(drinks);
      //   },
      //   error: (data) => {
      //     console.log(data);
      //   }
      // });
    return (
      <main>
        <ul id="cocktail-list">
        </ul>
      </main>
    );
  }
});
