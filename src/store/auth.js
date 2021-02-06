import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import Cookie from "cookie";
import Cookies from "js-cookie";
import jwtDevode from "jwt-decode";

export default {
  state: {
    token: null,
    user: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = null;
    },
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
    changeImage(state, image) {
      state.user.avatar = image;
    }
  },
  actions: {
    //создание пользователя
    async createUser(
      { commit, dispatch },
      { nickname, password, email, username, avatar }
    ) {
      commit("CLEAR_ERROR");
      commit("SET_LOADING", true);
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((data) => {
            firebase.database().ref(`users/${data.user.uid}/info`).set({
              username,
              email,
              nickname,
              avatar
            });
            dispatch("SET_USER", data.user.uid);
            dispatch("SET_TOKEN", data.user.uid);
            commit("SET_LOADING", false);
            commit("SET_MESSAGE", {text: "Вы успешно зарегистрированы"});
          });
      } catch (error) {
        commit("SET_LOADING", false);
        commit("SET_ERROR", {code: error.code, message: error.message});
        throw error;
      }
    },
    //логин
    async LOGIN({ commit, dispatch }, { email, password }) {
      commit("CLEAR_ERROR");
      commit("SET_LOADING", true);
      try {
        const data = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);

        dispatch("SET_USER", data.user.uid);
        dispatch("SET_TOKEN", data.user.uid);
        commit("SET_LOADING", false);
        commit("SET_MESSAGE", {text: "Вы успешно вошли"});
      } catch (error) {
        commit("SET_LOADING", false);
        commit("SET_ERROR", {code: error.code, message: error.message});
        throw error;
      }
    },

    //добавить токен
    SET_TOKEN({ commit }, token) {
      commit("setToken", token);
      Cookies.set("jwt-token", token);
    },

    //добавить пользователя
    async SET_USER({ commit }, id) {
      const user = (
        await firebase.database().ref(`users/${id}/info`).once("value")
      ).val();

      commit("setUser", user);
    },

    //автологин
    AUTO_LOGIN({ dispatch }) {
      const CookieStr = process.browser
        ? document.cookie
        : this.app.context.req.headers.cookie;

      const cookies = Cookie.parse(CookieStr || "") || {};
      const token = cookies["jwt-token"];
      if (isJwtToken) {
        dispatch("SET_TOKEN", token);
      } else {
        dispatch("LOGOUT");
      }
    },

    //выход
    async LOGOUT({ commit }) {
      commit("clearToken");
      commit("clearUser");
      Cookies.remove("jwt-token");
      await firebase.auth().signOut();
      commit("SET_MESSAGE", {text: "Вы успешно вышли из Chatter"});
    },
    //замена аватара
    async changeAvatar({ commit, getters }, imageFile) {
      commit("CLEAR_ERROR");
      commit("SET_LOADING", true);
      console.log("isCurrentToken", getters.isCurrentToken);
      try {
        const userID = getters.isCurrentToken;

        await firebase
          .storage()
          .ref(`usersAvatars/${userID}/${imageFile.name}`)
          .put(imageFile);

        const imageSrc = await firebase
          .storage()
          .ref(`usersAvatars/${userID}/${imageFile.name}`)
          .getDownloadURL();

        await firebase
          .database()
          .ref(`users/${userID}/info`)
          .update({ avatar: imageSrc });

        commit("changeImage", imageSrc);
        commit("SET_LOADING", false);
      } catch (error) {
        commit("SET_ERROR", {code: error.code, message: error.message});
        commit("SET_LOADING", false);
        console.log(error);
      }
    }
  },
  getters: {
    isAuthenticated: (state) => Boolean(state.token),
    isCurrentToken: (state) => state.token,
    isCurrentUser: (state) => state.user
  }
};

function isJwtToken(token) {
  if (!token) {
    return false;
  }

  const JwtData = jwtDevode(token) || {};
  const expires = JwtData.exp || 0;

  return new Date().getTime() / 1000 < expires;
}
