'use strict';

var myPics = {
  picturesBlock: document.querySelector('.pictures'),
  bigPictureRoot: document.querySelector('.big-picture'),
  bigPicture: {
    root: document.querySelector('.big-picture'),
    img: document.querySelector('.big-picture__img img'),
    likesCount: document.querySelector('.likes-count'),
    commentsCount: document.querySelector('.comments-count'),
    commentsBlock: document.querySelector('.social__comments'),
    description: document.querySelector('.social__caption'),
    commentCountWrapper: document.querySelector('.social__comment-count'),
    commentLoader: document.querySelector('.comments-loader')
  },
  fragment: document.createDocumentFragment(),
  fragment1: document.createDocumentFragment(),
  template: {
    picture: document.querySelector('#picture').content.querySelector('.picture'),
    comment: document.querySelector('#comment').content.querySelector('.social__comment'),
  },
  list: [],
  likesNumberUpper: 200,
  likesNumberLower: 15,
  commentsArray: [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ],
  descriptionsArray: [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ],
  getRandomNumber: function (from, to) {
    return Math.floor(Math.random() * (to - from) + from);
  },
  getRandomElement: function (array) {
    return array[Math.floor(Math.random() * array.length)];
  },
  getUrl: function (index) {
    var temp = index + 1;
    return ('photos/' + temp + '.jpg');
  },
  getLikesNumber: function () {
    return this.getRandomNumber(this.likesNumberLower, this.likesNumberUpper);
  },
  getComment: function () {
    var coin = Math.random();
    return coin > 0.5 ? this.getRandomElement(this.commentsArray) : this.getRandomElement(this.commentsArray) + ' ' + this.getRandomElement(this.commentsArray);
  },
  getCommentList: function () {
    var max = 3;
    var min = 1;
    var array = [];
    var count = this.getRandomNumber(min, max + 1);
    for (var i = 0; i < count; i += 1) {
      array.push(this.getComment());
    }
    return array;
  },
  getDescription: function () {
    return this.getRandomElement(this.descriptionsArray);
  },
  createPictureObj: function (index) {
    var obj = {};
    obj.url = this.getUrl(index);
    obj.likes = this.getLikesNumber();
    obj.comments = this.getCommentList();
    obj.description = this.getDescription();
    return obj;
  },
  renderPicture: function (picture) {
    var picNode = this.template.picture.cloneNode(true);
    picNode.querySelector('.picture__img').src = picture.url;
    picNode.querySelector('.picture__comments').textContent = picture.comments.length;
    picNode.querySelector('.picture__likes').textContent = picture.likes;

    return picNode;
  },
  renderCommentItem: function (comment) {
    var comNode = this.template.comment.cloneNode(true);
    var url = 'img/avatar-' + this.getRandomNumber(1, 7) + '.svg';
    comNode.querySelector('.social__text').textContent = comment;
    comNode.querySelector('.social__picture').src = url;

    return comNode;
  },
  renderCommentList: function (array, fragment) {
    var container = this.bigPicture.commentsBlock;

    while (container.firstChild) {
      container.firstChild.remove();
    }

    for (var i = 0; i < array.length; i += 1) {
      fragment.appendChild(this.renderCommentItem(array[i]));
    }
    container.appendChild(fragment);
  }
};

for (var i = 0; i < 25; i += 1) {
  myPics.list.push(myPics.createPictureObj(i));
  myPics.fragment.appendChild(myPics.renderPicture(myPics.list[i]));
}

myPics.picturesBlock.appendChild(myPics.fragment);
myPics.bigPicture.root.classList.remove('hidden');

myPics.bigPicture.img.src = myPics.list[0].url;
myPics.bigPicture.likesCount.textContent = myPics.list[0].likes;
myPics.bigPicture.commentsCount.textContent = myPics.list[0].comments.length;

myPics.renderCommentList(myPics.list[0].comments, myPics.fragment1);

myPics.bigPicture.description.textContent = myPics.list[0].description;
myPics.bigPicture.commentCountWrapper.classList.add('visually-hidden');
myPics.bigPicture.commentLoader.classList.add('visually-hidden');
