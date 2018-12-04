'use strict';

(function () {
  var preview = {};
  var config = window.config;
  var gallery = window.gallery;
  var utils = window.utils;

  function onEscPress(escEvt) {
    utils.isEscEvent(escEvt, close);
  }

  function onInputEscPress(escEvt) {
    utils.isEscEvent(escEvt, stopProp);
  }

  function stopProp(evt) {
    evt.stopPropagation();
  }

  function close(evt) {
    var BP = config.elements.bigPicture;
    evt.preventDefault();
    BP.root.classList.add('hidden');
    BP.close.removeEventListener('click', close);
    document.removeEventListener('keydown', onEscPress);
  }

  function open(item) {
    var BP = config.elements.bigPicture;
    BP.img.src = item.url;
    BP.likesCount.textContent = item.likes;
    BP.commentsCount.textContent = item.comments.length;
    BP.description.textContent = item.description;
    BP.commentsCountWrapper.classList.add('visually-hidden');
    BP.commentsLoader.classList.add('visually-hidden');

    gallery.renderCommentsList(item.comments);
    BP.root.classList.remove('hidden');

    BP.commentInput.addEventListener('keydown', onInputEscPress);
    BP.close.addEventListener('click', close);
    document.addEventListener('keydown', onEscPress);

    BP.close.focus();
  }

  preview.open = open;
  window.preview = preview;
})();
