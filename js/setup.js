'use strict';

(function () {
  var config = window.config;
  var gallery = window.gallery;
  var preview = window.preview;
  var form = window.form;

  function setup() {
    config.list = gallery.renderPicturesList(config.picsCount);

    config.list.forEach(function (item) {
      item.DOMElement.addEventListener('click', function () {
        preview.open(item);
      });
    });

    config.elements.imgUpload.input.addEventListener('change', form.open);
  }

  setup();
})();
