'use strict';

(function () {
  var gallery = {};
  var config = window.config;
  var utils = window.utils;

  function getUrl(index) {
    return ('photos/' + (index + 1) + '.jpg');
  }

  function getLikesNumber() {
    return utils.getRandomNumber(config.likesNumberLower, config.likesNumberUpper);
  }

  function getComment() {
    var coin = Math.random();
    var array = config.data.comments;
    var obj = {};
    obj.avatar = 'img/avatar-' + utils.getRandomNumber(1, 6) + '.svg';
    obj.text = coin > 0.5 ? utils.getRandomElement(array) : utils.getRandomElement(array) + ' ' + utils.getRandomElement(array);
    return obj;
  }

  function getCommentList() {
    var max = 3;
    var min = 1;
    var array = [];
    var count = utils.getRandomNumber(min, max);
    for (var i = 0; i < count; i += 1) {
      array.push(getComment());
    }
    return array;
  }

  function getDescription() {
    return utils.getRandomElement(config.data.descriptions);
  }

  function createPictureObj(index) {
    var obj = {};
    obj.url = getUrl(index);
    obj.likes = getLikesNumber();
    obj.comments = getCommentList();
    obj.description = getDescription();

    return obj;
  }

  function renderPicture(item) {
    var picNode = config.elements.template.picture.cloneNode(true);
    picNode.querySelector('.picture__img').src = item.url;
    picNode.querySelector('.picture__comments').textContent = item.comments.length;
    picNode.querySelector('.picture__likes').textContent = item.likes;

    return picNode;
  }

  function renderCommentItem(item) {
    var comNode = config.elements.template.comment.cloneNode(true);
    comNode.querySelector('.social__text').textContent = item.message;
    comNode.querySelector('.social__picture').src = item.avatar;

    return comNode;
  }

  function renderCommentsList(array, max) {
    var container = config.elements.bigPicture.commentsBlock;
    var fragment = document.createDocumentFragment();
    var len = array.length > max ? max : array.length;

    while (container.firstChild) {
      container.firstChild.remove();
    }

    for (var i = 0; i < len; i += 1) {
      fragment.appendChild(renderCommentItem(array[i]));
    }
    container.appendChild(fragment);
  }

  function renderMockList(count) {
    var fragment = document.createDocumentFragment();
    var list = [];

    for (var i = 0; i < count; i += 1) {
      list.push(createPictureObj(i));
      list[i].DOMElement = renderPicture(list[i]);
      fragment.appendChild(list[i].DOMElement);
    }
    config.elements.picturesBlock.root.appendChild(fragment);

    return list;
  }

  function renderPicturesList(list) {
    var fragment = document.createDocumentFragment();

    list.forEach(function (item) {
      item.DOMElement = renderPicture(item);
      fragment.appendChild(item.DOMElement);
    });

    config.elements.picturesBlock.root.appendChild(fragment);

    return list;
  }

  function updatePicturesList(list) {
    var container = config.elements.picturesBlock.root;
    var fragment = document.createDocumentFragment();
    var i = 0;

    while (container.children[i]) {
      if (container.children[i].classList.contains('picture')) {
        container.children[i].remove();
      } else {
        i += 1;
      }
    }

    list.forEach(function (item) {
      fragment.appendChild(item.DOMElement);
    });

    container.appendChild(fragment);
  }

  gallery.renderMockList = renderMockList;
  gallery.renderPicture = renderPicture;
  gallery.renderPicturesList = renderPicturesList;
  gallery.updatePicturesList = updatePicturesList;
  gallery.renderCommentsList = renderCommentsList;
  window.gallery = gallery;
})();
