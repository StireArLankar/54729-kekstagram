'use strict';

(function () {
  var utils = {};
  var config = window.config;

  function getRandomNumber(from, to) {
    return Math.round(Math.random() * (to - from) + from);
  }

  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function isEscEvent(evt, action) {
    if (evt.keyCode === config.keyCode.esc) {
      action(evt);
    }
  }

  function stopProp(evt) {
    evt.stopPropagation();
  }

  utils.getRandomNumber = getRandomNumber;
  utils.getRandomElement = getRandomElement;
  utils.isEscEvent = isEscEvent;
  utils.stopProp = stopProp;
  window.utils = utils;
})();
