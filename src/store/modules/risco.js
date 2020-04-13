import riscoService from '@/services/risco'

export const SET_RISCOS = 'SET_RISCOS'

const state = {
  riscos: []
}

const mutations = {
  [SET_RISCOS]: (state, riscos) => {
    state.riscos = riscos.map(r => ({ value: r.id_risco, label: r.titulo }))
  },
}

const getters = {
  riscos: state => state.riscos
}

const actions = {
  async searchRiscos({ commit }) {
    const response = await riscoService.search()
    commit(SET_RISCOS, response.data)
  }
}

export default {
  namespaced: true, state, mutations, getters, actions
}
