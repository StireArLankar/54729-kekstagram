'use strict';

// config definitions block
var config = {
  likesNumberUpper: 200,
  likesNumberLower: 15,
  picsCount: 25,
  list: [],
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
    picturesBlock: '.pictures',
    bigPicture: {
      root: '.big-picture',
      img: '.big-picture__img img',
      likesCount: '.likes-count',
      commentsCount: '.comments-count',
      commentsBlock: '.social__comments',
      description: '.social__caption',
      commentsCountWrapper: '.social__comment-count',
      commentsLoader: '.comments-loader'
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
    }
  },
  elements: {}
};

config.elements.picturesBlock = document.querySelector(config.selectors.picturesBlock);
config.elements.bigPicture = (function () {
  var obj = {};
  for (var selector in config.selectors.bigPicture) {
    if (config.selectors.bigPicture.hasOwnProperty(selector)) {
      obj[selector] = document.querySelector(config.selectors.bigPicture[selector]);
    }
  }
  return obj;
})();

config.elements.template = (function () {
  var obj = {};
  var temp1;
  var temp2;
  for (var selector in config.selectors.template) {
    if (config.selectors.template.hasOwnProperty(selector)) {
      temp2 = config.selectors.template[selector].cont;
      temp1 = config.selectors.template[selector].root;
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
  return coin > 0.5 ? getRandomElement(array) : getRandomElement(array) + ' ' + getRandomElement(array);
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

function renderPicture(picture) {
  var picNode = config.elements.template.picture.cloneNode(true);
  picNode.querySelector('.picture__img').src = picture.url;
  picNode.querySelector('.picture__comments').textContent = picture.comments.length;
  picNode.querySelector('.picture__likes').textContent = picture.likes;

  return picNode;
}

function renderCommentItem(comment) {
  var comNode = config.elements.template.comment.cloneNode(true);
  var url = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
  comNode.querySelector('.social__text').textContent = comment;
  comNode.querySelector('.social__picture').src = url;

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

function renderPicturesList(picsCount) {
  var fragment = document.createDocumentFragment();
  var list = [];

  for (var i = 0; i < picsCount; i += 1) {
    list.push(createPictureObj(i));
    fragment.appendChild(renderPicture(list[i]));
  }
  config.elements.picturesBlock.appendChild(fragment);
  return list;
}

function clear() {
  config.elements.bigPicture.root.classList.remove('hidden');
}

function renderBigPicture(item) {
  var BP = config.elements.bigPicture;
  BP.img.src = item.url;
  BP.likesCount.textContent = item.likes;
  BP.commentsCount.textContent = item.comments.length;
  BP.description.textContent = item.description;
  BP.commentsCountWrapper.classList.add('visually-hidden');
  BP.commentsLoader.classList.add('visually-hidden');
  renderCommentsList(item.comments);
}

function setup() {
  config.list = renderPicturesList(config.picsCount);
  clear();
  renderBigPicture(config.list[0]);
}

setup();
