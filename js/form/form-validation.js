'use strict';

(function () {
  var config = window.config;
  var utils = window.utils;
  var block = config.elements.imgUpload;

  function onInputEscPress(escEvt) {
    utils.isEscEvent(escEvt, utils.stopProp);
  }

  function onFieldInput(evt) {
    evt.target.setCustomValidity('');
    evt.target.classList.remove('text--invalid');
  }

  function onHashtagBlur() {
    var hashtags = block.hashtag.value.toLowerCase().split(' ');
    var i = 0;
    var j = 0;

    if (hashtags[0] === '') {
      return;
    }

    if (hashtags.length >= config.maxHashtags) {
      block.hashtag.setCustomValidity('Не более 5 хэш-тегов!');
      block.hashtag.classList.add('text--invalid');
      return;
    }

    for (i = 0; i < hashtags.length; i += 1) {
      if (hashtags[i][0] !== undefined && hashtags[i][0] !== '#') {
        block.hashtag.setCustomValidity('Хэш-теги должны начинаться с #!');
        block.hashtag.classList.add('text--invalid');
        return;
      }

      if (hashtags[i].length === 1) {
        block.hashtag.setCustomValidity('Хэш-теги должны содержать что-то помимо #!');
        block.hashtag.classList.add('text--invalid');
        return;
      }

      if (hashtags[i].length >= config.maxHashtagLength) {
        block.hashtag.setCustomValidity('Хэш-теги не должны быть длиннее 20 символов!');
        block.hashtag.classList.add('text--invalid');
        return;
      }

      for (j = i + 1; j < hashtags.length; j += 1) {
        if (hashtags[j] === hashtags[i]) {
          block.hashtag.setCustomValidity('Без повторяющихся хэш-тегов!');
          block.hashtag.classList.add('text--invalid');
          return;
        }
      }
    }
  }

  function onCommentsBlur() {
    var comments = block.comment.value;

    if (comments.length >= config.maxCommentLength) {
      block.comment.setCustomValidity('Не более 140 символов!');
      block.comment.classList.add('text--invalid');
      return;
    }
  }

  block.hashtag.addEventListener('blur', onHashtagBlur);
  block.comment.addEventListener('blur', onCommentsBlur);

  block.hashtag.addEventListener('keydown', onInputEscPress);
  block.comment.addEventListener('keydown', onInputEscPress);

  block.hashtag.addEventListener('input', onFieldInput);
  block.comment.addEventListener('input', onFieldInput);
})();
