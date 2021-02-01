"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _app = _interopRequireDefault(require("firebase/app"));

require("firebase/auth");

require("firebase/database");

var _cookie = _interopRequireDefault(require("cookie"));

var _jsCookie = _interopRequireDefault(require("js-cookie"));

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  state: {
    token: null,
    user: null
  },
  mutations: {
    setToken: function setToken(state, token) {
      state.token = token;
    },
    clearToken: function clearToken(state) {
      state.token = null;
    },
    setUser: function setUser(state, user) {
      state.user = user;
    },
    clearUser: function clearUser(state) {
      state.user = null;
    },
    changeImage: function changeImage(state, image) {
      state.user.avatar = image;
    }
  },
  actions: {
    //создание пользователя
    createUser: function createUser(_ref, _ref2) {
      var commit, nickname, password, email, username, avatar;
      return regeneratorRuntime.async(function createUser$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref.commit;
              nickname = _ref2.nickname, password = _ref2.password, email = _ref2.email, username = _ref2.username, avatar = _ref2.avatar;
              _context.prev = 2;
              _context.next = 5;
              return regeneratorRuntime.awrap(_app["default"].auth().createUserWithEmailAndPassword(email, password).then(function (data) {
                _app["default"].database().ref("users/".concat(data.user.uid, "/info")).set({
                  username: username,
                  email: email,
                  nickname: nickname,
                  avatar: avatar
                });
              }));

            case 5:
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](2);
              console.log(_context.t0);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[2, 7]]);
    },
    //логин
    LOGIN: function LOGIN(_ref3, _ref4) {
      var commit, dispatch, email, password, data;
      return regeneratorRuntime.async(function LOGIN$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref3.commit, dispatch = _ref3.dispatch;
              email = _ref4.email, password = _ref4.password;
              commit("CLEAR_ERROR");
              commit("SET_LOADING", true);
              _context2.prev = 4;
              _context2.next = 7;
              return regeneratorRuntime.awrap(_app["default"].auth().signInWithEmailAndPassword(email, password));

            case 7:
              data = _context2.sent;
              dispatch("SET_USER", data.user.uid);
              dispatch("SET_TOKEN", data.user.uid);
              commit("SET_LOADING", false);
              commit("SET_MESSAGE", 'Вы успешно вошли');
              _context2.next = 18;
              break;

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](4);
              commit("SET_ERROR", _context2.t0);
              throw _context2.t0;

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[4, 14]]);
    },
    //добавить токен
    SET_TOKEN: function SET_TOKEN(_ref5, token) {
      var commit = _ref5.commit;
      commit("setToken", token);

      _jsCookie["default"].set("jwt-token", token);
    },
    //добавить пользователя
    SET_USER: function SET_USER(_ref6, id) {
      var commit, user;
      return regeneratorRuntime.async(function SET_USER$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              commit = _ref6.commit;
              _context3.next = 3;
              return regeneratorRuntime.awrap(_app["default"].database().ref("users/".concat(id, "/info")).once("value"));

            case 3:
              user = _context3.sent.val();
              commit("setUser", user);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      });
    },
    //автологин
    AUTO_LOGIN: function AUTO_LOGIN(_ref7) {
      var dispatch = _ref7.dispatch;
      var CookieStr = process.browser ? document.cookie : this.app.context.req.headers.cookie;
      var cookies = _cookie["default"].parse(CookieStr || "") || {};
      var token = cookies["jwt-token"];

      if (isJwtToken) {
        dispatch("SET_TOKEN", token);
      } else {
        dispatch("LOGOUT");
      }
    },
    //выход
    LOGOUT: function LOGOUT(_ref8) {
      var commit;
      return regeneratorRuntime.async(function LOGOUT$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              commit = _ref8.commit;
              commit("clearToken");
              commit("clearUser");

              _jsCookie["default"].remove("jwt-token");

              _context4.next = 6;
              return regeneratorRuntime.awrap(_app["default"].auth().signOut());

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  },
  getters: {
    isAuthenticated: function isAuthenticated(state) {
      return Boolean(state.token);
    },
    isCurrentToken: function isCurrentToken(state) {
      return state.token;
    },
    isCurrentUser: function isCurrentUser(state) {
      return state.user;
    }
  }
};
exports["default"] = _default;

function isJwtToken(token) {
  if (!token) {
    return false;
  }

  var JwtData = (0, _jwtDecode["default"])(token) || {};
  var expires = JwtData.exp || 0;
  return new Date().getTime() / 1000 < expires;
}