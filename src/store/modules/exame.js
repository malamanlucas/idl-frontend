import exameService from '@/services/exame'

export const SET_EXAMES = 'SET_EXAMES'

const state = {
  exames: []
}

const mutations = {
  [SET_EXAMES]: (state, exames) => {
    state.exames = exames.map(e => ({ value: e.id_exame, label: e.nome }))
  }
}

const getters = {
  exames: state => state.exames
}

const actions = {
  async searchExames({ commit }) {
    const response = await exameService.search()
    commit(SET_EXAMES, response.data)
  }
}

export default {
  namespaced: true, state, mutations, getters, actions
}
