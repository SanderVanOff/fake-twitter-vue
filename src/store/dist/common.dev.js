"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  state: {
    loading: false,
    message: null,
    error: null
  },
  mutations: {
    SET_LOADING: function SET_LOADING(state, payload) {
      state.loading = payload;
    },
    SET_ERROR: function SET_ERROR(state, payload) {
      state.error = payload;
    },
    SET_MESSAGE: function SET_MESSAGE(state, payload) {
      state.message = payload;
    },
    CLEAR_ERROR: function CLEAR_ERROR(state) {
      state.error = null;
    }
  },
  actions: {
    setLoading: function setLoading(_ref, payload) {
      var commit = _ref.commit;
      commit('SET_LOADING', payload);
    },
    setError: function setError(_ref2, payload) {
      var commit = _ref2.commit;
      commit('SET_ERROR', payload);
    },
    setMessage: function setMessage(_ref3, payload) {
      var commit = _ref3.commit;
      commit('SET_MESSAGE', payload);
    },
    clearError: function clearError(_ref4, payload) {
      var commit = _ref4.commit;
      commit('CLEAR_ERROR', payload);
    }
  },
  getters: {
    LOADING: function LOADING(state) {
      return state.loading;
    },
    ERROR: function ERROR(state) {
      return state.error;
    },
    MESSAGE: function MESSAGE(state) {
      return state.message;
    }
  }
};
exports["default"] = _default;