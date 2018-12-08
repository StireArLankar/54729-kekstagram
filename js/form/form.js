'use strict';

(function () {
  var form = {};
  var config = window.config;
  var utils = window.utils;
  var formImage = window.formImage;
  var formImageResize = window.formImageResize;
  var backend = window.backend;
  var postResult = window.postResult;
  var url = 'https://js.dump.academy/kekstagram';
  var imgForm = config.elements.imgUpload.form;
  var hashtag = config.elements.imgUpload.hashtag;
  var comment = config.elements.imgUpload.comment;
  var radio = config.elements.imgUpload.effects;
  var img = config.elements.imgUpload.img;

  function onEscPress(escEvt) {
    utils.isEscEvent(escEvt, close);
  }

  function openFile(evt) {
    var input = evt.target;
    var reader = new FileReader();

    reader.onload = function () {
      var dataURL = reader.result;
      var output = img;
      output.src = dataURL;
    };

    reader.readAsDataURL(input.files[0]);
  }

  function resizeImg(scale) {
    var block = config.elements.imgUpload;

    block.scaleControlValue.value = scale + '%';
    block.img.style.transform = 'scale(' + (scale / 100) + ')';
  }

  function close() {
    var block = config.elements.imgUpload;

    block.overlay.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);

    block.close.removeEventListener('click', close);
    block.input.value = null;
  }

  function open(evt) {
    var block = config.elements.imgUpload;

    openFile(evt);

    block.overlay.classList.remove('hidden');
    document.addEventListener('keydown', onEscPress);

    block.close.addEventListener('click', close);
    block.close.focus();

    formImageResize.reset(block.scaleControlValue, resizeImg);
    formImage.changeImageEffect(0);
  }

  function onUpLoad() {
    comment.value = '';
    hashtag.value = '';
    radio[0].checked = true;
    close();
    postResult.show('succes');
  }

  function onError() {
    close();
    postResult.show('error');
  }

  imgForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    backend.upload(url, new FormData(imgForm), onUpLoad, onError);
  });

  form.open = open;
  window.form = form;
})();
