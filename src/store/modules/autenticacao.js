import autenticacaoService from '@/services/autenticacao'

export const SAVE_SESSION = 'SAVE_SESSION'

const state = {
  username: ''
}

const mutations = {
  [SAVE_SESSION]: (state, userData) => {
    state.username = userData.usuario
  },
}

const getters = {
  username: state => state.username
}

const actions = {
  login: async ({ commit }, { username, password }) => {
    try {
      const response = await autenticacaoService.login(username, password)
      const jwtDecrypted = autenticacaoService.saveCookie(response.data)
      commit(SAVE_SESSION, jwtDecrypted.userData[0])
      return Promise.resolve(true)
    } catch(e) {
      return Promise.reject(e)
    }
  },
  logout: ({}, router) => {
    autenticacaoService.deleteCookie()
    if (router) { // if router exists redirect to unauthorized
      router.push({ name: 'sessionExpired' })
    }
  }
}

export default {
  namespaced: true, state, mutations, getters, actions
}
