'use strict';

(function () {
  var formImage = {};
  var config = window.config;
  var formSlider = window.formSlider;
  var formImageResize = window.formImageResize;
  var block = config.elements.imgUpload;
  var handler = block.handler;
  var bar = block.depth;
  var input = block.effectValue;
  var filter = {};

  function onRadioChange(radioEvt) {
    changeImageEffect(radioEvt.target.value);
  }

  function changeImageEffect(value) {
    while (block.img.classList.length > 0) {
      block.img.classList.remove(block.img.classList.item(0));
    }

    block.img.classList.add('effects__preview--' + value);

    filter = config.filter[value];

    if (value === 'none') {
      block.slider.classList.add('hidden');
      block.img.style.filter = '';
    } else {
      block.slider.classList.remove('hidden');
      block.img.style.filter = filter.prefix + '(' + (1.0 * (filter.max - filter.min) + filter.min) + filter.postfix + ')';
    }

    formSlider.reset(handler, bar, input);
  }

  function changeEffectLevel(ratio) {
    block.img.style.filter = filter.prefix + '(' + (ratio * (filter.max - filter.min) + filter.min) + filter.postfix + ')';
  }

  function resizeImg(scale) {
    block.img.style.transform = 'scale(' + (scale / 100) + ')';
  }

  block.effectsList.addEventListener('change', onRadioChange);

  formSlider.init(handler, bar, input, changeEffectLevel);

  formImageResize.init(block.scaleControlUp, block.scaleControlDown, block.scaleControlValue, resizeImg);

  formImage.changeImageEffect = changeImageEffect;
  window.formImage = formImage;
})();
