'use strict';

(function () {
  var formImage = {};
  var config = window.config;
  var formSlider = window.formSlider;
  var block = config.elements.imgUpload;
  var handler = block.handler;
  var bar = block.depth;
  var input = block.effectValue;
  var filter = {};

  filter.prefix = '';
  filter.max = 0;
  filter.min = 0;
  filter.postfix = '';
  block.img.style.filter = '';

  function onRadioChange(radioEvt) {
    var target = radioEvt.target;
    for (var i = 0; i < block.effects.length; i += 1) {
      if (target === block.effects[i]) {
        changeImageEffect(i);
      }
    }
  }

  function changeImageEffect(index) {
    block.img.className = '';

    switch (index) {
      case 0:
        block.img.classList.add('effects__preview--none');
        block.slider.classList.add('hidden');
        break;
      case 1:
        block.img.classList.add('effects__preview--chrome');
        block.slider.classList.remove('hidden');
        break;
      case 2:
        block.img.classList.add('effects__preview--sepia');
        block.slider.classList.remove('hidden');
        break;
      case 3:
        block.img.classList.add('effects__preview--marvin');
        block.slider.classList.remove('hidden');
        break;
      case 4:
        block.img.classList.add('effects__preview--phobos');
        block.slider.classList.remove('hidden');
        break;
      case 5:
        block.img.classList.add('effects__preview--heat');
        block.slider.classList.remove('hidden');
        break;
    }

    filter.name = block.img.classList[0];

    switch (filter.name) {
      case 'effects__preview--none':
        filter.prefix = '';
        filter.max = 0;
        filter.min = 0;
        filter.postfix = '';
        block.img.style.filter = '';
        break;
      case 'effects__preview--chrome':
        filter.prefix = 'grayscale';
        filter.max = 1;
        filter.min = 0;
        filter.postfix = '';
        break;
      case 'effects__preview--sepia':
        filter.prefix = 'sepia';
        filter.max = 1;
        filter.min = 0;
        filter.postfix = '';
        break;
      case 'effects__preview--marvin':
        filter.prefix = 'invert';
        filter.max = 100;
        filter.min = 0;
        filter.postfix = '%';
        break;
      case 'effects__preview--phobos':
        filter.prefix = 'blur';
        filter.max = 3;
        filter.min = 1;
        filter.postfix = 'px';
        break;
      case 'effects__preview--heat':
        filter.prefix = 'brightness';
        filter.max = 3;
        filter.min = 1;
        filter.postfix = '';
        break;
    }

    formSlider.reset(handler, bar, input);
    block.img.style.filter = filter.prefix + '(' + (1.0 * (filter.max - filter.min) + filter.min) + filter.postfix + ')';
  }

  function changeEffectLevel() {
    var ratio = input.value / 100;
    block.img.style.filter = filter.prefix + '(' + (ratio * (filter.max - filter.min) + filter.min) + filter.postfix + ')';
  }

  function onImageGrow() {
    var scaleSTR = block.scaleControlValue.value.split(-1);
    var scale = parseFloat(scaleSTR);

    scale = (scale > 75) ? 100 : (scale + 25);
    block.scaleControlValue.value = scale + '%';
    block.img.style.transform = 'scale(' + (scale / 100) + ')';
  }

  function onImageShrink() {
    var scaleSTR = block.scaleControlValue.value.split(-1);
    var scale = parseFloat(scaleSTR);

    scale = (scale < 50) ? 25 : (scale - 25);
    block.scaleControlValue.value = scale + '%';
    block.img.style.transform = 'scale(' + (scale / 100) + ')';
  }

  block.effectsList.addEventListener('change', onRadioChange);
  formSlider.init(handler, bar, input, changeEffectLevel);

  block.scaleControlUp.addEventListener('click', onImageGrow);
  block.scaleControlDown.addEventListener('click', onImageShrink);

  formImage.changeImageEffect = changeImageEffect;
  window.formImage = formImage;
})();
