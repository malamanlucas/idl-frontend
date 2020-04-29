export const SET_MAIN_VERSION = 'SET_MAIN_VERSION'

const state = {
  search: {
    mainVersion: null
  }
}

const mutations = {
  [SET_MAIN_VERSION]: (state, mainVersion) => {
    state.search.mainVersion = mainVersion
  }
}

const getters = {
  mainVersion: state => state.search.mainVersion
}

const actions = {
}

export default {
  namespaced: true, state, mutations, getters, actions
}
