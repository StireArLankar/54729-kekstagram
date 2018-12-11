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

  function isRightEvent(evt, action) {
    if (evt.keyCode === config.keyCode.right) {
      action(evt);
    }
  }

  function isLeftEvent(evt, action) {
    if (evt.keyCode === config.keyCode.left) {
      action(evt);
    }
  }

  function stopProp(evt) {
    evt.stopPropagation();
  }

  function fisherYates(array, length) {
    var len = length < array.length ? length : array.length;
    var copy = array.slice(0);
    var result = [];
    var temp;

    for (var i = 0; i < len; i += 1) {
      temp = getRandomNumber(0, copy.length - 1);
      result.push(copy.splice(temp, 1)[0]);
    }

    return result;
  }

  utils.getRandomNumber = getRandomNumber;
  utils.getRandomElement = getRandomElement;
  utils.isEscEvent = isEscEvent;
  utils.stopProp = stopProp;
  utils.fisherYates = fisherYates;
  utils.isRightEvent = isRightEvent;
  utils.isLeftEvent = isLeftEvent;
  window.utils = utils;
})();
