'use strict';

(function () {
  var config = {
    updateDelay: 500,
    likesNumberUpper: 200,
    likesNumberLower: 15,
    picsCount: 25,
    maxHashtags: 5,
    maxHashtagLength: 20,
    maxCommentLength: 140,
    commentsStep: 5,
    list: [],
    filter: {
      none: {
        prefix: '',
        max: 0,
        min: 0,
        postfix: ''
      },
      chrome: {
        prefix: 'grayscale',
        max: 1,
        min: 0,
        postfix: ''
      },
      sepia: {
        prefix: 'sepia',
        max: 1,
        min: 0,
        postfix: ''
      },
      marvin: {
        prefix: 'invert',
        max: 100,
        min: 0,
        postfix: '%'
      },
      phobos: {
        prefix: 'blur',
        max: 3,
        min: 1,
        postfix: 'px'
      },
      heat: {
        prefix: 'brightness',
        max: 3,
        min: 1,
        postfix: ''
      }
    },
    keyCode: {
      esc: 27,
      enter: 13,
      left: 37,
      right: 39
    },
    scale: {
      start: 100,
      max: 100,
      min: 25,
      step: 25
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
      imgFilters: {
        root: '.img-filters',
        popular: '#filter-popular',
        new: '#filter-new',
        discussed: '#filter-discussed'
      },
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
        close: '.img-upload__cancel',
        submit: '.img-upload__submit'
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
        commentsLoader: '.comments-loader',
        commentInput: '.social__footer-text'
      },
      body: {
        root: 'body',
        main: 'main'
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
      },
      succes: {
        root: '#success',
        cont: '.success'
      },
      error: {
        root: '#error',
        cont: '.error'
      }
    },
    elements: {}
  };

  function findBlocks(selectors, action) {
    var keys = Object.keys(selectors);
    return keys.reduce(function (obj, key) {
      obj[key] = action(selectors[key]);
      return obj;
    }, {});
  }

  function findDOMElements(block) {
    var keys = Object.keys(block);
    return keys.map(function (key) {
      return document.querySelector(block[key]);
    }).reduce(function (obj, element, i) {
      obj[keys[i]] = element;
      return obj;
    }, {});
  }

  function findTemplateContent(block) {
    return document.querySelector(block.root).content.querySelector(block.cont);
  }

  config.elements = findBlocks(config.selectors, findDOMElements);
  config.elements.template = findBlocks(config.template, findTemplateContent);

  config.elements.imgUpload.effects = document.querySelectorAll('.effects__radio');

  window.config = config;
})();
