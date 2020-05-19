export const SET_MAIN_VERSION = 'SET_MAIN_VERSION'
export const SET_COMPARE_VERSIONS_ENABLED = 'SET_COMPARE_VERSIONS_ENABLED'
export const SET_VERSIONS_COMPARE = 'SET_VERSIONS_COMPARE'

const state = {
  search: {
    mainVersion: null,
    versionsCompare: [],
    compareVersionsEnabled: false
  }
}

const mutations = {
  [SET_VERSIONS_COMPARE]: (state, versionsCompare) => {
    state.search.versionsCompare = versionsCompare
  },
  [SET_COMPARE_VERSIONS_ENABLED]: (state, compareVersionsEnabled) => {
    state.search.compareVersionsEnabled = compareVersionsEnabled
  },
  [SET_MAIN_VERSION]: (state, mainVersion) => {
    state.search.mainVersion = mainVersion
  }
}

const getters = {
  mainVersion: state => state.search.mainVersion,
  versionsCompare: state => state.search.versionsCompare,
  compareVersionsEnabled: state => state.search.compareVersionsEnabled
}

const actions = {
}

export default {
  namespaced: true, state, mutations, getters, actions
}
