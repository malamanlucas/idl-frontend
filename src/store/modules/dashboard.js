import { isEmpty } from 'lodash'

export const SET_LOADING = 'SET_LOADING'
export const SET_ERROR_ON_MODAL = 'SET_ERROR_ON_MODAL'
export const SET_ERROR_ON_SNACKBAR = 'SET_ERROR_ON_SNACKBAR'
export const SET_SUCCESS_ON_SNACKBAR = 'SET_SUCCESS_ON_SNACKBAR'
export const HIDE_ALL_MESSAGES = 'HIDE_ALL_MESSAGES'

const state = {
  statuses: {
    errorOnModal: false,
    errorOnSnackbar: false,
    successOnSnackbar: false,
    errorMessage: '',
    loading: false
  }
}

const mutations = {
  [SET_LOADING]: (state, loading) => {
    state.statuses.loading = loading
  },
  [SET_ERROR_ON_MODAL]: (state, { value, errorMessage }) => {
    state.statuses.errorOnModal = value
    state.statuses.errorMessage = isEmpty(errorMessage) ? 'Undefined message' : errorMessage
  },
  [SET_ERROR_ON_SNACKBAR]: (state, { value, errorMessage }) => {
    state.statuses.errorOnSnackbar = value
    state.statuses.errorMessage = isEmpty(errorMessage) ? 'Undefined message' : errorMessage
  },
  [SET_SUCCESS_ON_SNACKBAR]: (state, { value, successMessage }) => {
    state.statuses.successOnSnackbar = value
    state.statuses.successMessage = successMessage
  },
  [HIDE_ALL_MESSAGES]: (state) => {
    state.statuses.errorOnModal = false
    state.statuses.errorOnSnackbar = false
    state.statuses.successOnSnackbar = false
  }
}

const getters = {
  statuses: state => state.statuses
}

const actions = {
  showLoading({ commit }) {
    commit(SET_LOADING, true)
  },
  hideLoading({ commit }) {
    commit(SET_LOADING, false)
  },
  hideAllMessages({ commit }) {
    commit(HIDE_ALL_MESSAGES)
  },
  showErrorOnModal({ commit }, errorMessage) {
    commit(HIDE_ALL_MESSAGES)
    commit(SET_ERROR_ON_MODAL, { value: true, errorMessage })
  },
  hideErrorOnModal({ commit }) {
    commit(SET_ERROR_ON_MODAL, { value: false })
  },
  showErrorOnSnackbar({ commit }, errorMessage) {
    commit(HIDE_ALL_MESSAGES)
    if (typeof errorMessage === 'string') {
      commit(SET_ERROR_ON_SNACKBAR, { value: true, errorMessage })
    } else {
      commit(SET_ERROR_ON_SNACKBAR, { value: true, errorMessage: JSON.stringify(errorMessage) })
    }
  },
  hideErrorOnSnackbar({ commit }) {
    commit(SET_ERROR_ON_SNACKBAR, { value: false })
  },
  showSuccessOnSnackbar({ commit }, successMessage) {
    commit(HIDE_ALL_MESSAGES)
    commit(SET_SUCCESS_ON_SNACKBAR, { value: true, successMessage })
  },
  hideSuccessOnSnackbar({ commit }) {
    commit(SET_SUCCESS_ON_SNACKBAR, { value: false })
  }
}

export default {
  namespaced: true, state, mutations, getters, actions
}
