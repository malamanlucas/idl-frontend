export const SET_MAIN_VERSION = 'SET_MAIN_VERSION'
export const SET_VERSIONS_COMPARE = 'SET_VERSIONS_COMPARE'

const state = {
  search: {
    mainVersion: null,
    versionsCompare: []
  }
}

const mutations = {
  [SET_VERSIONS_COMPARE]: (state, versionsCompare) => {
    state.search.versionsCompare = versionsCompare
  },
  [SET_MAIN_VERSION]: (state, mainVersion) => {
    state.search.mainVersion = mainVersion
  }
}

const getters = {
  mainVersion: state => state.search.mainVersion,
  versionsCompare: state => state.search.versionsCompare
}

const actions = {
}

export default {
  namespaced: true, state, mutations, getters, actions
}
