"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _auth = _interopRequireDefault(require("./auth"));

var _common = _interopRequireDefault(require("./common"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]); //модули


var _default = new _vuex["default"].Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: _auth["default"],
    common: _common["default"]
  }
});

exports["default"] = _default;