'use strict';

(function () {
  var preview = {};
  var config = window.config;
  var gallery = window.gallery;
  var utils = window.utils;
  var bodyElem = config.elements.body.root;
  var block = config.elements.bigPicture;

  function onInputEscPress(escEvt) {
    utils.isEscEvent(escEvt, utils.stopProp);
  }

  function open(item) {
    var len = item.comments.length;
    var maxLen = 0;

    function loadComments() {
      maxLen = (maxLen + config.commentsStep > len) ? len : (maxLen + config.commentsStep);
      gallery.renderCommentsList(item.comments, maxLen);
      renderCommentsNumber();
    }

    function renderCommentsNumber() {
      if (len > maxLen) {
        block.commentsCountWrapper.innerHTML = maxLen + ' из <span class="comments-count">' + len + '</span>  комментариев';
      } else {
        block.commentsCountWrapper.innerHTML = len + ' из <span class="comments-count">' + len + '</span>  комментариев';
        block.commentsLoader.classList.add('visually-hidden');
      }
    }

    function onEscPress(escEvt) {
      utils.isEscEvent(escEvt, close);
    }

    function close(evt) {
      bodyElem.classList.remove('modal-open');

      block.commentsLoader.removeEventListener('click', loadComments);

      evt.preventDefault();
      block.root.classList.add('hidden');
      block.close.removeEventListener('click', close);
      document.removeEventListener('keydown', onEscPress);
    }

    bodyElem.classList.add('modal-open');

    if (item.filter) {
      block.img.style.filter = item.filter;
    } else {
      block.img.style.filter = '';
    }

    block.img.src = item.url;
    block.likesCount.textContent = item.likes;
    block.commentsCount.textContent = item.comments.length;
    block.description.textContent = item.description;
    block.commentsLoader.classList.remove('visually-hidden');

    loadComments();
    block.commentsLoader.addEventListener('click', loadComments);

    block.root.classList.remove('hidden');

    block.commentInput.addEventListener('keydown', onInputEscPress);
    block.close.addEventListener('click', close);
    document.addEventListener('keydown', onEscPress);

    block.close.focus();
  }

  preview.open = open;
  window.preview = preview;
})();
