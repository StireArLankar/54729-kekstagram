'use strict';

// config definitions block
var config = {
  likesNumberUpper: 200,
  likesNumberLower: 15,
  picsCount: 25,
  list: [],
  keyCode: {
    esc: 27,
    enter: 13
  },
  data: {
    comments: [
      'Всё отлично!',
      'В целом всё неплохо. Но не всё.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
    ],
    descriptions: [
      'Тестим новую камеру!',
      'Затусили с друзьями на море',
      'Как же круто тут кормят',
      'Отдыхаем...',
      'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
      'Вот это тачка!'
    ]
  },
  selectors: {
    picturesBlock: {
      root: '.pictures'
    },
    imgUpload: {
      root: '.img-upload',
      form: '.img-upload__form',
      input: '#upload-file',
      overlay: '.img-upload__overlay',
      img: '.img-upload__preview img',
      effectsList: '.effects__list',
      scaleControlUp: '.scale__control--bigger',
      scaleControlDown: '.scale__control--smaller',
      scaleControlValue: '.scale__control--value',
      slider: '.effect-level',
      handler: '.effect-level__pin',
      depth: '.effect-level__depth',
      close: '.img-upload__cancel'
    },
    bigPicture: {
      root: '.big-picture',
      img: '.big-picture__img img',
      close: '.big-picture__cancel',
      likesCount: '.likes-count',
      commentsCount: '.comments-count',
      commentsBlock: '.social__comments',
      description: '.social__caption',
      commentsCountWrapper: '.social__comment-count',
      commentsLoader: '.comments-loader'
    }
  },
  template: {
    picture: {
      root: '#picture',
      cont: '.picture'
    },
    comment: {
      root: '#comment',
      cont: '.social__comment'
    }
  },
  elements: {}
};

config.elements = (function () {
  var obj = {};
  for (var block in config.selectors) {
    if (config.selectors.hasOwnProperty(block)) {
      obj[block] = (function () {
        var object = {};
        for (var selector in config.selectors[block]) {
          if (config.selectors[block].hasOwnProperty(selector)) {
            object[selector] = document.querySelector(config.selectors[block][selector]);
          }
        }
        return object;
      })();
    }
  }
  return obj;
})();

config.elements.imgUpload.effects = document.querySelectorAll('.effects__radio');

config.elements.template = (function () {
  var obj = {};
  var temp1;
  var temp2;
  for (var selector in config.template) {
    if (config.template.hasOwnProperty(selector)) {
      temp2 = config.template[selector].cont;
      temp1 = config.template[selector].root;
      obj[selector] = document.querySelector(temp1)
                              .content
                              .querySelector(temp2);
    }
  }
  return obj;
})();

// functions definitions block
function getRandomNumber(from, to) {
  return Math.round(Math.random() * (to - from) + from);
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getUrl(index) {
  return ('photos/' + (index + 1) + '.jpg');
}

function getLikesNumber() {
  return getRandomNumber(config.likesNumberLower, config.likesNumberUpper);
}

function getComment() {
  var coin = Math.random();
  var array = config.data.comments;
  var obj = {};
  obj.avatar = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
  obj.text = coin > 0.5 ? getRandomElement(array) : getRandomElement(array) + ' ' + getRandomElement(array);
  return obj;
}

function getCommentList() {
  var max = 3;
  var min = 1;
  var array = [];
  var count = getRandomNumber(min, max);
  for (var i = 0; i < count; i += 1) {
    array.push(getComment());
  }
  return array;
}

function getDescription() {
  return getRandomElement(config.data.descriptions);
}

function createPictureObj(index) {
  var obj = {};
  obj.url = getUrl(index);
  obj.likes = getLikesNumber();
  obj.comments = getCommentList();
  obj.description = getDescription();

  return obj;
}

function renderPicture(item) {
  var picNode = config.elements.template.picture.cloneNode(true);
  picNode.querySelector('.picture__img').src = item.url;
  picNode.querySelector('.picture__comments').textContent = item.comments.length;
  picNode.querySelector('.picture__likes').textContent = item.likes;

  return picNode;
}

function renderCommentItem(item) {
  var comNode = config.elements.template.comment.cloneNode(true);
  comNode.querySelector('.social__text').textContent = item.text;
  comNode.querySelector('.social__picture').src = item.avatar;

  return comNode;
}

function renderCommentsList(array) {
  var container = config.elements.bigPicture.commentsBlock;
  var fragment = document.createDocumentFragment();

  while (container.firstChild) {
    container.firstChild.remove();
  }

  for (var i = 0; i < array.length; i += 1) {
    fragment.appendChild(renderCommentItem(array[i]));
  }
  container.appendChild(fragment);
}

function renderPicturesList(count) {
  var fragment = document.createDocumentFragment();
  var list = [];

  for (var i = 0; i < count; i += 1) {
    list.push(createPictureObj(i));
    fragment.appendChild(renderPicture(list[i]));
  }
  config.elements.picturesBlock.root.appendChild(fragment);

  list.forEach(function (item, index) {
    var j = index + 2;
    item.DOMElement = config.elements.picturesBlock.root.children[j];
  });

  return list;
}

function openBigPicture(item) {
  var BP = config.elements.bigPicture;
  BP.img.src = item.url;
  BP.likesCount.textContent = item.likes;
  BP.commentsCount.textContent = item.comments.length;
  BP.description.textContent = item.description;
  BP.commentsCountWrapper.classList.add('visually-hidden');
  BP.commentsLoader.classList.add('visually-hidden');
  renderCommentsList(item.comments);
  config.elements.bigPicture.root.classList.remove('hidden');
  BP.close.addEventListener('click', closeBigPicture);
  BP.close.focus();
}

function closeBigPicture(evt) {
  var BP = config.elements.bigPicture;
  evt.preventDefault();
  BP.root.classList.add('hidden');
  BP.close.removeEventListener('click', closeBigPicture);
}

function onImgUploadEscPress(escEvt) {
  if (escEvt.keyCode === config.keyCode.esc) {
    closeImgUpload();
  }
}

function openImgUpload() {
  document.addEventListener('keydown', onImgUploadEscPress);

  var block = config.elements.imgUpload;
  var filter = {
    name: '',
    postfix: ''
  };

  function changeImageEffect(index) {
    while (block.img.classList.length > 0) {
      block.img.classList.remove(block.img.classList.item(0));
    }

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

    filter.name = block.img.classList[0].slice(18);

    switch (filter.name) {
      case 'none':
        filter.prefix = '';
        filter.max = 0;
        filter.min = 0;
        filter.postfix = '';
        block.img.style.filter = '';
        break;
      case 'chrome':
        filter.prefix = 'grayscale';
        filter.max = 1;
        filter.min = 0;
        filter.postfix = '';
        break;
      case 'sepia':
        filter.prefix = 'sepia';
        filter.max = 1;
        filter.min = 0;
        filter.postfix = '';
        break;
      case 'marvin':
        filter.prefix = 'invert';
        filter.max = 100;
        filter.min = 0;
        filter.postfix = '%';
        break;
      case 'phobos':
        filter.prefix = 'blur';
        filter.max = 3;
        filter.min = 1;
        filter.postfix = 'px';
        break;
      case 'heat':
        filter.prefix = 'brightness';
        filter.max = 3;
        filter.min = 1;
        filter.postfix = '';
        break;
    }

    block.depth.style.width = '100%';
    block.handler.style.left = '100%';
    block.img.style.filter = filter.prefix + '(' + (1.0 * (filter.max - filter.min) + filter.min) + filter.postfix + ')';
  }

  block.handler.addEventListener('mousedown', function (pressEvt) {
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

      pressEvt.target.style.left = (ratio * 100) + '%';
      block.depth.style.width = (ratio * 100) + '%';

      block.img.style.filter = filter.prefix + '(' + (ratio * (filter.max - filter.min) + filter.min) + filter.postfix + ')';
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
  });

  block.scaleControlUp.addEventListener('click', function () {
    var scaleSTR = block.scaleControlValue.value.split(-1);
    var scale = parseFloat(scaleSTR);

    scale = (scale > 75) ? 100 : (scale + 25);
    block.scaleControlValue.value = scale + '%';
    block.img.style.transform = 'scale(' + (scale / 100) + ')';
  });

  block.scaleControlDown.addEventListener('click', function () {
    var scaleSTR = block.scaleControlValue.value.split(-1);
    var scale = parseFloat(scaleSTR);

    scale = (scale < 50) ? 25 : (scale - 25);
    block.scaleControlValue.value = scale + '%';
    block.img.style.transform = 'scale(' + (scale / 100) + ')';
  });

  block.overlay.classList.remove('hidden');
  block.close.addEventListener('click', closeImgUpload);
  block.close.focus();
  changeImageEffect(5);
  block.effectsList.addEventListener('change', function (radioEvt) {
    var target = radioEvt.target;
    for (var i = 0; i < block.effects.length; i += 1) {
      if (target === block.effects[i]) {
        changeImageEffect(i);
      }
    }
  });
}

function closeImgUpload() {
  var block = config.elements.imgUpload;
  block.overlay.classList.add('hidden');
  block.close.removeEventListener('click', closeImgUpload);
  block.input.value = null;
  document.removeEventListener('keydown', onImgUploadEscPress);
}

function setup() {
  config.list = renderPicturesList(config.picsCount);

  config.list.forEach(function (item) {
    item.DOMElement.addEventListener('click', function () {
      openBigPicture(item);
    });
  });

  config.elements.imgUpload.input.addEventListener('change', function () {
    openImgUpload();
  });
}

setup();
