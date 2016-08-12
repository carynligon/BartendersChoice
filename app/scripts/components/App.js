import $ from 'jquery';
import React from 'react';

export default React.createClass({
  render() {
    // for (var i = 0; i < 21; i++) {
      $.ajax({
        url: `https://baas.kinvey.com/rpc/${settings.appKey}/custom/cocktails`,
        contentType: 'application/JSON',
        success: (data) => {
          console.log(data);
        },
        error: (data) => {
          console.log(data);
        }
      });
    // }
    return (
      <main>
        <ul id="cocktail-list">
        </ul>
      </main>
    );
  }
});
