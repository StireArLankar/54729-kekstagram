'use strict';

(function () {
  var form = {};
  var config = window.config;
  var utils = window.utils;
  var formImage = window.formImage;

  function open() {
    var block = config.elements.imgUpload;

    function onEscPress(escEvt) {
      utils.isEscEvent(escEvt, close);
    }

    function close() {
      block.overlay.classList.add('hidden');
      document.removeEventListener('keydown', onEscPress);

      block.close.removeEventListener('click', close);
      block.input.value = null;
    }

    block.overlay.classList.remove('hidden');
    document.addEventListener('keydown', onEscPress);

    block.close.addEventListener('click', close);
    block.close.focus();
    block.img.style.transform = 'scale(1)';
    formImage.changeImageEffect(0);
  }

  form.open = open;
  window.form = form;
})();
