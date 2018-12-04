'use strict';

(function () {
  var formSlider = {};

  function onSliderDrag(pressEvt, handler, bar, input, action) {
    pressEvt.preventDefault();
    var currentPointX = pressEvt.clientX;
    var parentWidth = pressEvt.target.parentNode.offsetWidth;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var pressedX = currentPointX - moveEvt.clientX;
      var passedX = pressEvt.target.offsetLeft - pressedX;
      var ratio;

      currentPointX = moveEvt.clientX;

      if (passedX < 0) {
        passedX = 0;
      }

      if (passedX > parentWidth) {
        passedX = parentWidth;
      }

      ratio = passedX / parentWidth;

      input.value = Math.round(ratio * 100);
      handler.style.left = (ratio * 100) + '%';
      bar.style.width = (ratio * 100) + '%';

      action(ratio);
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
  }

  formSlider.init = function (handler, bar, input, action) {
    handler.addEventListener('mousedown', function (pressEvt) {
      onSliderDrag(pressEvt, handler, bar, input, action);
    });
  };

  formSlider.reset = function (handler, bar, input) {
    input.value = 100;
    handler.style.left = 100 + '%';
    bar.style.width = 100 + '%';
  };

  window.formSlider = formSlider;
})();
