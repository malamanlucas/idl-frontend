import { isEmpty } from 'lodash'
import funcionarioService from '@/services/funcionario'

export const SET_FUNCIONARIOS = 'SET_FUNCIONARIOS'
export const SET_FILTROS = 'SET_FILTROS'
export const SET_PAGE = 'SET_PAGE'
export const SET_PER_PAGE = 'SET_PER_PAGE'
export const SET_COLUMN = 'SET_COLUMN'
export const SET_DESC = 'SET_DESC'
export const SET_LOADING = 'SET_LOADING'

const state = {
  busca: {
    funcionarios: [],
    page: 1,
    perPage: 5,
    lastPage: 0,
    total: 0,
    column: '',
    desc: 0,
    loading: false,
    filtros: [],
  }
}

const mutations = {
  [SET_FUNCIONARIOS]: (state, payload) => {
    state.busca.funcionarios = payload.data
    state.busca.page = payload.page
    state.busca.lastPage = payload.last_page
    state.busca.total = payload.total
  },
  [SET_FILTROS]: (state, payload) => {
    state.busca.filtros = payload
  },
  [SET_PAGE]: (state, payload) => {
    state.busca.page = payload
  },
  [SET_PER_PAGE]: (state, payload) => [
    state.busca.perPage = payload
  ],
  [SET_COLUMN]: (state, payload) => {
    state.busca.column = payload
  },
  [SET_DESC]: (state, payload) => {
    state.busca.desc = payload
  },
  [SET_LOADING]: (state, payload) => {
    state.busca.loading = payload
  }
}

const getters = {
  hasFuncionarios: state => !isEmpty(state.busca.funcionarios),
  funcionarios: state => state.busca.funcionarios,
  page: state => state.busca.page,
  lastPage: state => state.busca.lastPage,
  total: state => state.busca.total,
  perPage: state => state.busca.perPage,
  column: state => state.busca.column,
  desc: state => state.busca.desc,
  filtros: state => state.busca.filtros,
  loading: state => state.busca.loading
}

const actions = {
  async buscaFuncionarios({ commit, getters }) {
    commit(SET_LOADING, true)

    const response = await funcionarioService.search({
      page: getters.page,
      perPage: getters.perPage,
      column: getters.column,
      desc: getters.desc,
      filters: getters.filtros
    })

    commit(SET_FUNCIONARIOS, response.data)
    commit(SET_LOADING, false)
  }
}

export default {
  namespaced: true, state, mutations, getters, actions
}
