'use strict';

(function () {
  var config = window.config;
  var utils = window.utils;
  var block = config.elements.imgUpload;

  function onInputEscPress(escEvt) {
    utils.isEscEvent(escEvt, stopProp);
  }

  function stopProp(evt) {
    evt.stopPropagation();
  }

  function onFieldInput() {
    block.hashtag.setCustomValidity('');
    block.comment.setCustomValidity('');
  }

  function onFieldBlur() {
    var hashtags = block.hashtag.value.toLowerCase().split(' ');
    var comments = block.comment.value;
    var i = 0;
    var j = 0;

    if (hashtags[0] === '' && comments === '') {
      return;
    }

    if (hashtags.length >= config.maxHashtags) {
      block.hashtag.setCustomValidity('Не более 5 хэш-тегов!');
      return;
    }

    for (i = 0; i < hashtags.length; i += 1) {
      if (hashtags[i][0] !== '#') {
        block.hashtag.setCustomValidity('Хэш-теги должны начинаться с #!');
        return;
      }

      if (hashtags[i].length === 1) {
        block.hashtag.setCustomValidity('Хэш-теги должны содержать что-то помимо #!');
        return;
      }

      if (hashtags[i].length >= config.maxHashtagLength) {
        block.hashtag.setCustomValidity('Хэш-теги не должны быть длиннее 20 символов!');
        return;
      }

      for (j = i + 1; j < hashtags.length; j += 1) {
        if (hashtags[j] === hashtags[i]) {
          block.hashtag.setCustomValidity('Без повторяющихся хэш-тегов!');
          return;
        }
      }
    }

    if (comments.length >= config.maxCommentLength) {
      block.comments.setCustomValidity('Не более 140 символов!');
      return;
    }
  }

  block.hashtag.addEventListener('blur', onFieldBlur);
  block.comment.addEventListener('blur', onFieldBlur);

  block.hashtag.addEventListener('keydown', onInputEscPress);
  block.comment.addEventListener('keydown', onInputEscPress);

  block.hashtag.addEventListener('input', onFieldInput);
  block.comment.addEventListener('input', onFieldInput);
})();
