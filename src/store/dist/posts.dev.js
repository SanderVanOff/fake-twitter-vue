"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _app = _interopRequireDefault(require("firebase/app"));

require("firebase/database");

require("firebase/storage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  state: {
    posts: []
  },
  mutations: {
    //добавляем новый пост в стэйт
    SET_POST_TO_STATE: function SET_POST_TO_STATE(state, post) {
      state.posts.unshift(post);
    },
    //добавляем полученные из БД посты в стэйт
    SET_ALL_POST_TO_STATE: function SET_ALL_POST_TO_STATE(state, allPosts) {
      state.posts = allPosts;
    },
    //удаляем нужны пост из стейта
    REMOVE_POST_FROM_STATE: function REMOVE_POST_FROM_STATE(state, index) {
      state.posts.splice(index, 1);
    },
    //добавление лайка
    ADD_LIKE_POST: function ADD_LIKE_POST(state, payload) {
      var post = state.posts.find(function (item) {
        return item.id === payload.id;
      });
      post.likes.push(payload.currentNicknameUser);
    },
    //удаление лайка
    DELETE_LIKE_POST: function DELETE_LIKE_POST(state, _ref) {
      var id = _ref.id,
          currentNicknameUser = _ref.currentNicknameUser;
      var post = state.posts.find(function (item) {
        return item.id === id;
      });
      var indexLike = post.likes.indexOf(currentNicknameUser);
      post.likes.splice(indexLike, 1);
    }
  },
  actions: {
    //создание нового поста
    getNewPost: function getNewPost(_ref2, _ref3) {
      var commit, post, fileImg, imageSrc;
      return regeneratorRuntime.async(function getNewPost$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref2.commit;
              post = _ref3.post, fileImg = _ref3.fileImg;
              commit("CLEAR_ERROR");
              commit("SET_LOADING", true);
              _context.prev = 4;
              _context.next = 7;
              return regeneratorRuntime.awrap(_app["default"].database().ref("posts/".concat(post.id)).set(post));

            case 7:
              if (!fileImg) {
                _context.next = 16;
                break;
              }

              _context.next = 10;
              return regeneratorRuntime.awrap(_app["default"].storage().ref("postImg/".concat(post.id, "/").concat(fileImg.name)).put(fileImg));

            case 10:
              _context.next = 12;
              return regeneratorRuntime.awrap(_app["default"].storage().ref("postImg/".concat(post.id, "/").concat(fileImg.name)).getDownloadURL());

            case 12:
              imageSrc = _context.sent;
              _context.next = 15;
              return regeneratorRuntime.awrap(_app["default"].database().ref("posts/".concat(post.id)).update({
                image: imageSrc
              }));

            case 15:
              post.image = imageSrc;

            case 16:
              commit("SET_POST_TO_STATE", post);
              commit("SET_LOADING", false);
              _context.next = 25;
              break;

            case 20:
              _context.prev = 20;
              _context.t0 = _context["catch"](4);
              commit("SET_LOADING", false);
              commit("SET_ERROR", _context.t0);
              throw _context.t0;

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[4, 20]]);
    },
    //получение постов из БД
    fetchAllPosts: function fetchAllPosts(_ref4) {
      var commit, allPosts, posts;
      return regeneratorRuntime.async(function fetchAllPosts$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref4.commit;
              _context2.prev = 1;
              allPosts = [];
              _context2.next = 5;
              return regeneratorRuntime.awrap(_app["default"].database().ref("posts").once("value"));

            case 5:
              posts = _context2.sent.val();
              Object.keys(posts).forEach(function (key) {
                allPosts.unshift(posts[key]);
              });
              commit("SET_ALL_POST_TO_STATE", allPosts);
              _context2.next = 13;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](1);
              console.log(_context2.t0);

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[1, 10]]);
    },
    //удаление поста
    removePost: function removePost(_ref5, _ref6) {
      var commit, getters, id, image, imgSrc, index;
      return regeneratorRuntime.async(function removePost$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              commit = _ref5.commit, getters = _ref5.getters;
              id = _ref6.id, image = _ref6.image;
              commit("CLEAR_ERROR");
              commit("SET_LOADING", true);
              _context3.prev = 4;
              _context3.next = 7;
              return regeneratorRuntime.awrap(_app["default"].database().ref("posts/".concat(id)).remove());

            case 7:
              if (!image) {
                _context3.next = 11;
                break;
              }

              imgSrc = _app["default"].storage().refFromURL(image); //удаляем картинку из хранилища

              _context3.next = 11;
              return regeneratorRuntime.awrap(imgSrc["delete"]());

            case 11:
              index = getters.ALL_POSTS.findIndex(function (item) {
                return item.id === id;
              });
              commit("REMOVE_POST_FROM_STATE", index);
              commit("SET_LOADING", false);
              _context3.next = 22;
              break;

            case 16:
              _context3.prev = 16;
              _context3.t0 = _context3["catch"](4);
              commit("SET_LOADING", false);
              console.log(_context3.t0);
              commit("SET_ERROR", _context3.t0);
              throw _context3.t0;

            case 22:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[4, 16]]);
    },
    //лайк поста
    LikesPost: function LikesPost(_ref7, _ref8) {
      var commit, getters, id, currentNicknameUser, changePost;
      return regeneratorRuntime.async(function LikesPost$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              commit = _ref7.commit, getters = _ref7.getters;
              id = _ref8.id, currentNicknameUser = _ref8.currentNicknameUser;
              changePost = getters["ALL_POSTS"].find(function (post) {
                return post.id === id;
              });

              if (!changePost.likes.includes(currentNicknameUser)) {
                _context4.next = 8;
                break;
              }

              _context4.next = 6;
              return regeneratorRuntime.awrap(commit("DELETE_LIKE_POST", {
                id: id,
                currentNicknameUser: currentNicknameUser
              }));

            case 6:
              _context4.next = 10;
              break;

            case 8:
              _context4.next = 10;
              return regeneratorRuntime.awrap(commit("ADD_LIKE_POST", {
                id: id,
                currentNicknameUser: currentNicknameUser
              }));

            case 10:
              _context4.next = 12;
              return regeneratorRuntime.awrap(_app["default"].database().ref("posts/".concat(id, "/likes")).set(changePost.likes));

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      });
    },
    //добавление комментария
    getNewComment: function getNewComment(_ref9, comment) {
      var commit, getters, postForComment;
      return regeneratorRuntime.async(function getNewComment$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              commit = _ref9.commit, getters = _ref9.getters;
              postForComment = getters["ALL_POSTS"].find(function (post) {
                return post.id === comment.postId;
              });

              if (!postForComment.comments) {
                postForComment.comments = [];
              }

              postForComment.comments.push(comment);
              _context5.next = 6;
              return regeneratorRuntime.awrap(_app["default"].database().ref("posts/".concat(comment.postId, "/comments")).set(postForComment.comments));

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  },
  getters: {
    ALL_POSTS: function ALL_POSTS(state) {
      return state.posts;
    }
  }
};
exports["default"] = _default;