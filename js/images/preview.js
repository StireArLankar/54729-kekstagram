'use strict';

(function () {
  var preview = {};
  var config = window.config;
  var gallery = window.gallery;
  var utils = window.utils;
  var bodyElem = config.elements.body.root;
  var BP = config.elements.bigPicture;

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
        BP.commentsCountWrapper.innerHTML = maxLen + ' из <span class="comments-count">' + len + '</span>  комментариев';
      } else {
        BP.commentsCountWrapper.innerHTML = len + ' из <span class="comments-count">' + len + '</span>  комментариев';
        BP.commentsLoader.classList.add('visually-hidden');
      }
    }

    function onEscPress(escEvt) {
      utils.isEscEvent(escEvt, close);
    }

    function close(evt) {
      bodyElem.classList.remove('modal-open');

      BP.commentsLoader.removeEventListener('click', loadComments);

      evt.preventDefault();
      BP.root.classList.add('hidden');
      BP.close.removeEventListener('click', close);
      document.removeEventListener('keydown', onEscPress);
    }

    bodyElem.classList.add('modal-open');

    BP.img.src = item.url;
    BP.likesCount.textContent = item.likes;
    BP.commentsCount.textContent = item.comments.length;
    BP.description.textContent = item.description;
    BP.commentsLoader.classList.remove('visually-hidden');

    loadComments();
    BP.commentsLoader.addEventListener('click', loadComments);

    BP.root.classList.remove('hidden');

    BP.commentInput.addEventListener('keydown', onInputEscPress);
    BP.close.addEventListener('click', close);
    document.addEventListener('keydown', onEscPress);

    BP.close.focus();
  }

  preview.open = open;
  window.preview = preview;
})();
