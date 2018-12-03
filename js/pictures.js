'use strict';

// config definitions block
var config = {
  likesNumberUpper: 200,
  likesNumberLower: 15,
  picsCount: 25,
  maxHashtags: 5,
  maxHashtagLength: 20,
  maxCommentLength: 140,
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
      effectValue: '.effect-level__value',
      hashtag: '.text__hashtags',
      comment: '.text__description',
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
    list[i].DOMElement = renderPicture(list[i]);
    fragment.appendChild(list[i].DOMElement);
  }
  config.elements.picturesBlock.root.appendChild(fragment);

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

function openImgUpload() {
  var block = config.elements.imgUpload;
  var filter = {
    name: '',
    postfix: ''
  };

  function onImgUploadEscPress(escEvt) {
    if (escEvt.keyCode === config.keyCode.esc) {
      closeImgUpload();
    }
  }

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

    block.depth.style.width = '100%';
    block.handler.style.left = '100%';
    block.effectValue.value = 100;
    block.img.style.filter = filter.prefix + '(' + (1.0 * (filter.max - filter.min) + filter.min) + filter.postfix + ')';
  }

  function onSliderDrag(pressEvt) {
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
      block.effectValue.value = Math.round(ratio * 100);

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

  function onInputEscPress(escEvt) {
    if (escEvt.keyCode === config.keyCode.esc) {
      escEvt.stopPropagation();
    }
  }

  function onFieldInput() {
    block.hashtag.setCustomValidity('');
    block.comment.setCustomValidity('');
  }

  function onFieldBlur() {
    var hashtags = block.hashtag.value.toLowerCase().split(' ');
    var comments = block.comment.value;
    var i = 0;
    var j = 0;

    if (hashtags[0] === '' && comments === '') {
      return;
    }

    if (hashtags.length >= config.maxHashtags) {
      block.hashtag.setCustomValidity('Не более 5 хэш-тегов!');
      return;
    }

    for (i = 0; i < hashtags.length; i += 1) {
      if (hashtags[i][0] !== '#') {
        block.hashtag.setCustomValidity('Хэш-теги должны начинаться с #!');
        return;
      }

      if (hashtags[i].length === 1) {
        block.hashtag.setCustomValidity('Хэш-теги должны содержать что-то помимо #!');
        return;
      }

      if (hashtags[i].length >= config.maxHashtagLength) {
        block.hashtag.setCustomValidity('Хэш-теги не должны быть длиннее 20 символов!');
        return;
      }

      for (j = i + 1; j < hashtags.length; j += 1) {
        if (hashtags[j] === hashtags[i]) {
          block.hashtag.setCustomValidity('Без повторяющихся хэш-тегов!');
          return;
        }
      }
    }

    if (comments.length >= config.maxCommentLength) {
      block.comments.setCustomValidity('Не более 140 символов!');
      return;
    }
  }

  function closeImgUpload() {
    block.overlay.classList.add('hidden');
    document.removeEventListener('keydown', onImgUploadEscPress);

    block.hashtag.removeEventListener('blur', onFieldBlur);
    block.comment.removeEventListener('blur', onFieldBlur);

    block.hashtag.removeEventListener('keydown', onInputEscPress);
    block.comment.removeEventListener('keydown', onInputEscPress);

    block.hashtag.removeEventListener('input', onFieldInput);
    block.comment.removeEventListener('input', onFieldInput);

    block.close.removeEventListener('click', closeImgUpload);
    block.handler.removeEventListener('mousedown', onSliderDrag);
    block.scaleControlUp.removeEventListener('click', onImageGrow);
    block.scaleControlDown.removeEventListener('click', onImageShrink);
    block.effectsList.removeEventListener('change', onRadioChange);
    block.input.value = null;
  }

  block.overlay.classList.remove('hidden');
  document.addEventListener('keydown', onImgUploadEscPress);

  block.hashtag.addEventListener('blur', onFieldBlur);
  block.comment.addEventListener('blur', onFieldBlur);

  block.hashtag.addEventListener('keydown', onInputEscPress);
  block.comment.addEventListener('keydown', onInputEscPress);

  block.hashtag.addEventListener('input', onFieldInput);
  block.comment.addEventListener('input', onFieldInput);

  block.close.addEventListener('click', closeImgUpload);
  block.handler.addEventListener('mousedown', onSliderDrag);
  block.scaleControlUp.addEventListener('click', onImageGrow);
  block.scaleControlDown.addEventListener('click', onImageShrink);
  block.effectsList.addEventListener('change', onRadioChange);
  block.close.focus();
  block.img.style.transform = 'scale(1)';
  changeImageEffect(0);
}

function setup() {
  config.list = renderPicturesList(config.picsCount);

  config.list.forEach(function (item) {
    item.DOMElement.addEventListener('click', function () {
      openBigPicture(item);
    });
  });

  config.elements.imgUpload.input.addEventListener('change', openImgUpload);
}

setup();
