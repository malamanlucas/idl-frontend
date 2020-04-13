import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import autenticacao from './modules/autenticacao'
import dashboard from './modules/dashboard'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['autenticacao']
})

export default new Vuex.Store({
  modules: {
    autenticacao,
    dashboard
  },
  strict: debug,
  plugins: [vuexLocal.plugin]
})
