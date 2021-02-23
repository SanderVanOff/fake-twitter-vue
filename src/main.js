import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//Bootstrap
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

//vue-backtotop
import BackToTop from 'vue-backtotop'

Vue.use(BackToTop)

//Notifications
import Notifications from 'vue-notification'
Vue.use(Notifications);
//firebase
import firebase from "firebase/app";
const firebaseOption = {
  apiKey: "AIzaSyDGL2fZiHIAthUDF_iqoefuGe0BCzHALRQ",
  authDomain: "fake-twitter-8319b.firebaseapp.com",
  projectId: "fake-twitter-8319b",
  storageBucket: "fake-twitter-8319b.appspot.com",
  messagingSenderId: "797485465036",
  appId: "1:797485465036:web:95c86298ce1482ee22b169",
  measurementId: "G-DZWWLSJWBH"
};

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

//styles
import "normalize.css";
import "./theme/index.css";
import './registerServiceWorker'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    let app = null;
    if (!firebase.apps.length) {
      app = firebase.initializeApp(firebaseOption);
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.$store.dispatch("AUTO_LOGIN");
          this.$store.dispatch("SET_USER", user.uid);
        } else if (this.$route.path !== "/login") {
          this.$router.push("/login");
        }
      });
    }
  },
  render: (h) => h(App)
}).$mount("#app");
