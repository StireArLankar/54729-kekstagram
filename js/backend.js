'use strict';

(function () {
  var backend = {};

  function load(url, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Собщение об ошибке');
      }
    });

    xhr.addEventListener('error', function () {
      onError('Собщение об ошибке');
    });

    xhr.addEventListener('timeout', function () {
      onError('Собщение об ошибке');
    });

    xhr.timeout = 10000;

    xhr.open('GET', url);
    xhr.send();
  }

  function upload(url, data, onUpLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onUpLoad(xhr.response);
      } else {
        onError('Собщение об ошибке');
      }
    });

    xhr.addEventListener('error', function () {
      onError('Собщение об ошибке');
    });

    xhr.addEventListener('timeout', function () {
      onError('Собщение об ошибке');
    });

    xhr.timeout = 10000;

    xhr.open('POST', url);
    xhr.send(data);
  }

  backend.load = load;
  backend.upload = upload;
  window.backend = backend;
})();
