'use strict';

(function () {
  var formImageResize = {};
  var config = window.config;
  var scale = config.scale;

  function init(upBtn, downBtn, input, action) {
    upBtn.addEventListener('click', function () {
      onImageGrow(input, action);
    });

    downBtn.addEventListener('click', function () {
      onImageShrink(input, action);
    });
  }

  function reset(input, action) {
    input.value = scale.start + '%';
    action(scale.start);
  }

  function onImageGrow(input, action) {
    var newScale = parseFloat(input.value.split(-1));
    var max = Math.round(scale.max - scale.step);

    newScale = (newScale > max) ? scale.max : (newScale + scale.step);

    input.value = newScale + '%';
    action(newScale);
  }

  function onImageShrink(input, action) {
    var newScale = parseFloat(input.value.split(-1));
    var min = Math.round(scale.min + scale.step);

    newScale = (newScale < min) ? scale.min : (newScale - scale.step);

    input.value = newScale + '%';
    action(newScale);
  }

  formImageResize.init = init;
  formImageResize.reset = reset;

  window.formImageResize = formImageResize;
})();
