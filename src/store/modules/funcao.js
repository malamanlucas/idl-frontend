import { isEmpty, cloneDeep, has } from 'lodash'
import funcaoService from '@/services/funcao'
import { compareTextLettersOnly } from '@/core/utils/comparatorUtils'
import { COMMON_STATUS } from '@/strings'

export const SET_FUNCOES = 'SET_FUNCOES'
export const SET_FUNCAO = 'SET_FUNCAO'
export const SET_FILTRO = 'SET_FILTRO'
export const RESET_FUNCAO = 'RESET_FUNCAO'
export const SET_EXAMES_FUNCAO = 'SET_EXAMES_FUNCAO'

const defaultFuncao = {
  name: '',
  riscos: [],
  exames: []
}

const state = {
  funcao: cloneDeep(defaultFuncao),
  busca: {
    funcoes: [],
    filtro: {
      status: 1,
      name: ''
    }
  }
}

const mutations = {
  [RESET_FUNCAO]: (state) => {
    state.funcao = cloneDeep(defaultFuncao)
  },
  [SET_FUNCOES]: (state, funcoes) => {
    state.busca.funcoes = funcoes.map(f => ({
      id: f.id_funcao,
      name: f.nome,
      status: f.status
    }))
  },
  [SET_EXAMES_FUNCAO]: (state, exames) => {
    state.funcao.exames = exames
    // state.funcao.exames.splice(0)
    // exames.forEach(e => state.funcao.exames.push(e))
  },
  [SET_FUNCAO]: (state, payload) => {
    state.funcao.name = payload.nome
    state.funcao.id = payload.idFuncao
    state.funcao.riscos = payload.riscos.map(r => ({ value: r.id_risco, label: r.titulo }))
    state.funcao.exames = payload.exames.map(r => ({ value: r.id_exame, label: r.nome }))
    // Exames should be disabled, Ex: only avaliação clinica
    state.funcao.exames.filter(e => e.value === 1).forEach(e => e.disabled = true)
    state.funcao.isActive = payload.isActive
  },
  [SET_FILTRO](state, filtro) {
    for (const key in filtro) {
      if (has(filtro, key)) {
        state.busca.filtro[key] = filtro[key]
      }
    }
  }
}

const getters = {
  funcoes: state => state.busca.funcoes,
  itemsFiltered: (state) => {
    let funcoesFiltered = state.busca.funcoes

    const funcaoToSearch = state.busca.filtro.name

    funcoesFiltered = funcoesFiltered.filter(e => e.status === state.busca.filtro.status)

    if (!isEmpty(funcaoToSearch)) {
      funcoesFiltered = funcoesFiltered.filter(f => compareTextLettersOnly(f.name, funcaoToSearch))
    }

    return funcoesFiltered
  },
  getFiltro: state => state.busca.filtro,
  modelForEdit: state => state.funcao,
  isEmptyList: state => isEmpty(state.busca.funcoes)
}

const actions = {
  async search({ commit }, { idEmpresa, id }) {
    const response = await funcaoService.searchFuncoes(idEmpresa, id)
    commit(SET_FUNCOES, response.data)
  },
  async save({ commit }, { idEmpresa, model }) {
    console.log(idEmpresa, model)
    model.status = COMMON_STATUS.ATIVA
    await funcaoService.save(model, idEmpresa)
    commit(RESET_FUNCAO)
  },
  async loadById({ commit }, { idEmpresa, id }) {
    const response = await funcaoService.findById(idEmpresa, id)
    commit(SET_FUNCAO, response.data)
  }
}

export default {
  namespaced: true, state, mutations, getters, actions
}
