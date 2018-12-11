'use strict';

(function () {
  var config = window.config;
  var utils = window.utils;
  var gallery = window.gallery;
  var imgFilters = config.elements.imgFilters;
  var lastTimeout;

  var buttonList = findButtons(imgFilters);

  function findButtons(block) {
    var keys = Object.keys(block);
    return keys.filter(function (key) {
      return block[key].type === 'button';
    }).map(function (key) {
      return block[key];
    });
  }

  function filterList(list, id) {
    if (id === 'filter-popular') {
      return list;
    }

    var shallowCopy = list.slice(0);
    switch (id) {
      case 'filter-new':
        return utils.fisherYates(shallowCopy, 10);
      case 'filter-discussed':
        return shallowCopy.sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });
      default:
        return list;
    }
  }

  buttonList.forEach(function (button) {
    button.addEventListener('click', updateImgs);
  });

  function updateImgs(evt) {
    var target = evt.target;
    var filteredImgList;

    if (target.classList.contains('img-filters__button--active')) {
      return;
    }

    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }

    lastTimeout = setTimeout(function () {
      filteredImgList = filterList(config.list, target.id);
      gallery.updatePicturesList(filteredImgList);
      buttonList.forEach(function (button) {
        button.classList.remove('img-filters__button--active');
      });
      target.classList.add('img-filters__button--active');
    }, config.updateDelay);
  }

})();
