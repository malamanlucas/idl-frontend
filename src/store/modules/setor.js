import { isEmpty, cloneDeep, has } from 'lodash'
import setorService from '@/services/setor'
import { compareTextLettersOnly } from '@/core/utils/comparatorUtils'
import { COMMON_STATUS } from '@/strings'

export const SET_SETORES = 'SET_SETORES'
export const SET_SETOR = 'SET_SETOR'
export const SET_FILTRO = 'SET_FILTRO'
export const RESET_SETOR = 'RESET_SETOR'
export const SET_EXAMES_SETOR = 'SET_EXAMES_SETOR'

const defaultSetor = {
  name: '',
  riscos: [],
  exames: []
}

const state = {
  setor: cloneDeep(defaultSetor),
  busca: {
    setores: [],
    filtro: {
      status: 1,
      name: ''
    }
  }
}

const mutations = {
  [RESET_SETOR]: (state) => {
    state.setor = cloneDeep(defaultSetor)
  },
  [SET_SETORES]: (state, setores) => {
    state.busca.setores = setores.map(f => ({
      id: f.id_setor,
      name: f.setor,
      status: COMMON_STATUS.ATIVA
    }))
  },
  [SET_EXAMES_SETOR]: (state, exames) => {
    state.setor.exames = exames
    // state.setor.exames.splice(0)
    // exames.forEach(e => state.setor.exames.push(e))
  },
  [SET_SETOR]: (state, payload) => {
    state.setor.name = payload.setor
    state.setor.id = payload.idSetor
    state.setor.riscos = payload.riscos.map(r => ({ value: r.id_risco, label: r.titulo }))
    state.setor.exames = payload.exames.map(r => ({ value: r.id_exame, label: r.nome }))
    // Exames should be disabled, Ex: only avaliação clinica
    state.setor.exames.filter(e => e.value === 1).forEach(e => e.disabled = true)
    state.setor.isActive = payload.isActive
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
  setores: state => state.busca.setores,
  itemsFiltered: (state) => {
    let setoresFiltered = state.busca.setores

    const setorToSearch = state.busca.filtro.name

    setoresFiltered = setoresFiltered.filter(e => e.status === state.busca.filtro.status)

    if (!isEmpty(setorToSearch)) {
      setoresFiltered = setoresFiltered.filter(f => compareTextLettersOnly(f.name, setorToSearch))
    }

    return setoresFiltered
  },
  getFiltro: state => state.busca.filtro,
  modelForEdit: state => state.setor,
  isEmptyList: state => isEmpty(state.busca.setores)
}

const actions = {
  async search({ commit }, { idEmpresa }) {
    const response = await setorService.searchSetores(idEmpresa)
    commit(SET_SETORES, response.data)
  },
  async save({ commit }, { idEmpresa, model }) {
    model.status = COMMON_STATUS.ATIVA
    await setorService.save(model, idEmpresa)
    await commit(RESET_SETOR)
  },
  async loadById({ commit }, { id }) {
    const response = await setorService.searchSetor(id)
    await commit(SET_SETOR, response.data)
  }
}

export default {
  namespaced: true, state, mutations, getters, actions
}
