'use strict';

(function () {
  var config = {
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
      enter: 13
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

  window.config = config;
})();
