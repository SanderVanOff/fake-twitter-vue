"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

var _bootstrapVue = require("bootstrap-vue");

require("bootstrap/dist/css/bootstrap.css");

require("bootstrap-vue/dist/bootstrap-vue.css");

var _vueBacktotop = _interopRequireDefault(require("vue-backtotop"));

var _vueNotification = _interopRequireDefault(require("vue-notification"));

var _app = _interopRequireDefault(require("firebase/app"));

require("normalize.css");

require("./theme/index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//Bootstrap
// Import Bootstrap an BootstrapVue CSS files (order is important)
//vue-backtotop
_vue["default"].use(_vueBacktotop["default"]); //Notifications


_vue["default"].use(_vueNotification["default"]); //firebase


var firebaseOption = {
  apiKey: "AIzaSyDGL2fZiHIAthUDF_iqoefuGe0BCzHALRQ",
  authDomain: "fake-twitter-8319b.firebaseapp.com",
  projectId: "fake-twitter-8319b",
  storageBucket: "fake-twitter-8319b.appspot.com",
  messagingSenderId: "797485465036",
  appId: "1:797485465036:web:95c86298ce1482ee22b169",
  measurementId: "G-DZWWLSJWBH"
}; // Make BootstrapVue available throughout your project

_vue["default"].use(_bootstrapVue.BootstrapVue); // Optionally install the BootstrapVue icon components plugin


_vue["default"].use(_bootstrapVue.IconsPlugin); //styles


_vue["default"].config.productionTip = false;
new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  created: function created() {
    var _this = this;

    var app = null;

    if (!_app["default"].apps.length) {
      app = _app["default"].initializeApp(firebaseOption);

      _app["default"].auth().onAuthStateChanged(function (user) {
        if (user) {
          _this.$store.dispatch("AUTO_LOGIN");

          _this.$store.dispatch("SET_USER", user.uid);
        } else if (_this.$route.path !== "/login") {
          _this.$router.push("/login");
        }
      });
    }
  },
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount("#app");