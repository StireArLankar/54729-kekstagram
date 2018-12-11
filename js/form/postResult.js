'use strict';

(function () {
  var postResult = {};
  var config = window.config;
  var utils = window.utils;
  var main = config.elements.body.main;

  function show(result) {
    var fragment = document.createDocumentFragment();
    var block = config.elements.template[result].cloneNode(true);
    var btn = block.querySelectorAll('button');
    var inner = block.children[0];
    fragment.appendChild(block);

    main.appendChild(fragment);

    btn[0].focus();

    inner.addEventListener('click', utils.stopProp);
    document.addEventListener('click', close);
    document.addEventListener('keydown', onEscPress);

    for (var i = 0; i < btn.length; i += 1) {
      btn[i].addEventListener('click', close);
    }

    function close() {
      document.removeEventListener('click', close);
      document.removeEventListener('keydown', onEscPress);

      for (var j = 0; j < btn.length; j += 1) {
        btn[j].removeEventListener('click', close);
      }

      block.remove();
    }

    function onEscPress(escEvt) {
      utils.isEscEvent(escEvt, close);
    }
  }

  postResult.show = show;
  window.postResult = postResult;
})();
