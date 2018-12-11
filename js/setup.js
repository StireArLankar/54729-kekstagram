'use strict';

(function () {
  var config = window.config;
  var gallery = window.gallery;
  var preview = window.preview;
  var form = window.form;
  var backend = window.backend;
  var url = 'https://js.dump.academy/kekstagram/data';

  function setup() {
    // config.list = gallery.renderMockList(config.picsCount);
    // addPreviewListeners();
    backend.load(url, onLoad, onError);
    config.elements.imgUpload.input.addEventListener('change', form.open);
  }

  function onError() {
    // console.log(error);
  }

  function addPreviewListeners() {
    config.list.forEach(function (item) {
      item.DOMElement.addEventListener('click', function () {
        preview.open(item);
      });
    });
  }

  function onLoad(response) {
    config.list = gallery.renderPicturesList(response);
    setTimeout(addPreviewListeners(), 0);
    config.elements.imgFilters.root.classList.remove('img-filters--inactive');
  }

  setup();
})();
