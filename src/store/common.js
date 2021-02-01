export default {
    state:{
        loading: false,
        message: null,
        error: null
    },
    mutations:{
        SET_LOADING(state, payload){
            state.loading = payload
        },
        SET_ERROR(state, payload){
            state.error = payload
        },
        SET_MESSAGE(state, payload) {
            state.message = payload
        },
        CLEAR_ERROR(state){
            state.error = null
        }
    },
    actions: {
        setLoading({commit}, payload) {
            commit('SET_LOADING', payload)
        },
        setError({commit}, payload) {
            commit('SET_ERROR', payload)
        },
        setMessage({commit}, payload) {
            commit('SET_MESSAGE', payload)
        },
        clearError({commit}, payload) {
            commit('CLEAR_ERROR', payload)
        }
    },
    getters: {
        LOADING(state) {
            return state.loading
        },
        ERROR(state) {
            return state.error
        },
        MESSAGE(state) {
            return state.message
        }
    }
}