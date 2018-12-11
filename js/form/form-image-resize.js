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
    var scaleSTR = input.value.split(-1);
    var scaleNUM = parseFloat(scaleSTR);
    var max = Math.round(scale.max - scale.step);

    scaleNUM = (scaleNUM > max) ? scale.max : (scaleNUM + scale.step);

    input.value = scaleNUM + '%';
    action(scaleNUM);
  }

  function onImageShrink(input, action) {
    var scaleSTR = input.value.split(-1);
    var scaleNUM = parseFloat(scaleSTR);
    var min = Math.round(scale.min + scale.step);

    scaleNUM = (scaleNUM < min) ? scale.min : (scaleNUM - scale.step);

    input.value = scaleNUM + '%';
    action(scaleNUM);
  }

  formImageResize.init = init;
  formImageResize.reset = reset;

  window.formImageResize = formImageResize;
})();
