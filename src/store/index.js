import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    errorMessage: null
  },
  mutations: {
    SET_ERROR_MESSAGE(state, message) {
      state.errorMessage = message
    }
  },
  actions: {
  },
  modules: {
  }
})
