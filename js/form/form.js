'use strict';

(function () {
  var form = {};
  var config = window.config;
  var utils = window.utils;
  var gallery = window.gallery;
  var preview = window.preview;
  var formImage = window.formImage;
  var formImageResize = window.formImageResize;
  var backend = window.backend;
  var postResult = window.postResult;
  var url = 'https://js.dump.academy/kekstagram';
  var block = config.elements.imgUpload;
  var imgForm = block.form;
  var hashtag = block.hashtag;
  var comment = block.comment;
  var radio = block.effects;
  var img = block.img;
  var submitBtn = block.submit;

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
    block.scaleControlValue.value = scale + '%';
    block.img.style.transform = 'scale(' + (scale / 100) + ')';
  }

  function close() {
    block.overlay.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);

    block.close.removeEventListener('click', close);
    block.input.value = null;
  }

  function open(evt) {
    openFile(evt);

    block.overlay.classList.remove('hidden');
    submitBtn.disabled = false;
    document.addEventListener('keydown', onEscPress);

    block.close.addEventListener('click', close);
    block.scaleControlDown.focus();

    formImageResize.reset(block.scaleControlValue, resizeImg);
    formImage.changeImageEffect('none');
  }

  function onUpLoad() {
    var effectNumber = block.effectValue.value;
    var effectName = Array.from(config.elements.imgUpload.effects).reduce(function (acc, cur) {
      acc = cur.checked ? cur : acc;
      return acc;
    }, {}).value;
    var eff = config.filter[effectName];
    var filterEffect = effectName === 'none' ? '' : (eff.prefix + '(' + ((effectNumber / 100) * (eff.max - eff.min) + eff.min) + eff.postfix + ')');

    var newImg = {
      url: img.src,
      description: (comment.value + ' ' + hashtag.value),
      comments: [],
      likes: 0,
      filter: filterEffect
    };

    comment.value = '';
    hashtag.value = '';
    radio[0].checked = true;
    close();
    postResult.show('succes');

    config.list.push(newImg);
    newImg.DOMElement = gallery.renderPicture(newImg);
    newImg.DOMElement.style.filter = filterEffect;
    newImg.DOMElement.addEventListener('click', function () {
      preview.open(newImg);
    });
    gallery.updatePicturesList(config.list);
  }

  function onError() {
    close();
    postResult.show('error');
  }

  imgForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    submitBtn.disabled = true;
    backend.upload(url, new FormData(imgForm), onUpLoad, onError);
  });

  form.open = open;
  window.form = form;
})();
