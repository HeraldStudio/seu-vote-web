import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocalStorage = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state: {
    token:'',
    cardnum: "",
    hasUnfinishedRoute: false,
    unfinishedRoute: {},
    permission:{}
  },
  mutations: {
    saveUnfinishedRoute(state, payload) {
      state.hasUnfinishedRoute = true
      state.unfinishedRoute = payload
    },
    clearUnfinishedRoute(state) {
      state.hasUnfinishedRoute = false
    },
    clearCache(state) {
      state.token = ""
      state.cardnum =""
    },
    token(state, payload) {
      state.token = payload
    },
    cardnum(state, payload) {
      state.cardnum = payload
    },
  },
  actions: {
  },
  modules: {
  }
})
