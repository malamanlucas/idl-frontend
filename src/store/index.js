import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import autenticacao from './modules/autenticacao'
import dashboard from './modules/dashboard'
import empresa from './modules/empresa'
import funcionario from './modules/funcionario'
import funcao from './modules/funcao'
import setor from './modules/setor'
import exame from './modules/exame'
import risco from './modules/risco'
import common from './modules/common'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['autenticacao']
})

export default new Vuex.Store({
  modules: {
    autenticacao,
    dashboard,
    empresa,
    funcionario,
    exame,
    common,
    risco,
    setor,
    funcao
  },
  strict: debug,
  plugins: [vuexLocal.plugin]
})
