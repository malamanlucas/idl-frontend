import {
 cloneDeep, isNil, isEmpty, get, has
} from 'lodash'
import empresaService from '@/services/empresa'
import { STATUS_EMPRESA } from '@/strings'
import { extractOnlyNumbers } from '@/core/utils/formatter'
import { compareTextLettersOnly } from '@/core/utils/comparatorUtils'

export const SET_EMPRESA = 'SET_EMPRESA'
export const SET_EMPRESA_FROM_FORM = 'SET_EMPRESA_FROM_FORM'
export const RESET_EMPRESA = 'RESET_EMPRESA'
export const SET_EMPRESA_BY_CNPJ = 'SET_EMPRESA_BY_CNPJ'
export const SET_CNPJ = 'SET_CNPJ'
export const SET_EMPRESAS_AND_CORPORACOES = 'SET_EMPRESAS_AND_CORPORACOES'
export const SET_FILTRO_STATUS = 'SET_FILTRO_STATUS'
export const SET_FILTRO_EMPRESA = 'SET_FILTRO_EMPRESA'
export const SET_FILTRO_CORPORACAO = 'SET_FILTRO_CORPORACAO'
export const SET_STATUS_EMPRESA = 'SET_STATUS_EMPRESA'
export const SET_EMPRESA_BY_ID = 'SET_EMPRESA_BY_ID'
export const SET_CORPORACAO_ID_IN_EMPRESA = 'SET_CORPORACAO_ID_IN_EMPRESA'
export const SET_EMPRESA_REGISTERED = 'SET_EMPRESA_REGISTERED'

const defaultEmpresa = {
  razaoSocial: '',
  cnpj: '',
  id: undefined,
  cnae: '',
  endereco: '',
  numero: '',
  bairro: '',
  cidade: undefined,
  uf: '',
  cep: '',
  status: null,
  idCorporacao: null
}

const state = {
  empresa: cloneDeep(defaultEmpresa),
  empresaRegistered: {
    id: null,
    razaoSocial: null
  },
  busca: {
    empresas: {
      qtd: 0,
      list: [],
      filtro: {
        status: STATUS_EMPRESA.TODAS,
        razaoSocial: ''
      }
    },
    corporacoes: {
      qtd: 0,
      list: [],
      filtro: {
        nome: ''
      }
    }
  }
}

const getCidade = (payload) => {
  const { nomeCidade } = payload
  if (!isNil(nomeCidade)) {
    return nomeCidade
  }
  return payload.enderecoNomeCidade
}

const getUf = (payload) => {
  const { uf } = payload
  if (!isNil(uf)) {
    return uf
  }
  return payload.enderecoUf
}

const mutations = {
  [SET_STATUS_EMPRESA]: (state, status) => {
    state.empresa.status = status
  },
  [SET_EMPRESA]: (state, empresa) => {
    state.empresa = empresa
  },
  [SET_CORPORACAO_ID_IN_EMPRESA]: (state, idCorporacao) => {
    state.empresa.idCorporacao = idCorporacao
  },
  [SET_EMPRESA_REGISTERED]: (state, payload) => {
    state.empresaRegistered.id = payload.id
    state.empresaRegistered.razaoSocial = payload.razaoSocial
  },
  [SET_EMPRESA_FROM_FORM]: (state, empresa) => {
    state.empresa.cnae = empresa.cnae
    state.empresa.bairro = empresa.bairro
    state.empresa.cep = empresa.cep
    state.empresa.cidade = empresa.cidade
    state.empresa.numero = empresa.numero
    state.empresa.endereco = empresa.endereco
    state.empresa.id = empresa.id
    state.empresa.razaoSocial = empresa.razaoSocial
    state.empresa.uf = empresa.uf
  },
  [SET_CNPJ]: (state, cnpj) => {
    state.empresa.cnpj = cnpj
  },
  [RESET_EMPRESA]: (state) => {
    const idCorporacaoSetted = state.empresa.idCorporacao
    state.empresa = cloneDeep(defaultEmpresa)
    state.empresa.idCorporacao = idCorporacaoSetted
  },
  [SET_EMPRESA_BY_CNPJ]: (state, payload) => {
    state.empresa.cnae = payload.cnaePrincipalCodigo
    state.empresa.bairro = payload.enderecoBairro
    state.empresa.cep = payload.enderecoCep
    state.empresa.cidade = { id_cidade: payload.enderecoIdCidade, nome: getCidade(payload) }
    state.empresa.numero = payload.enderecoNumero
    state.empresa.endereco = payload.enderecoRua
    state.empresa.id = payload.id
    state.empresa.razaoSocial = payload.razaoSocial
    state.empresa.status = payload.statusEmpresa
    if (!isNil(payload.idCorporacao)) { // sobreescreve a corporação da empresa q veio
      state.empresa.idCorporacao = payload.idCorporacao
    }
    state.empresa.uf = getUf(payload)
  },
  [SET_EMPRESA_BY_ID]: (state, payload) => {
    state.empresa.cnpj = payload.cnpj
    state.empresa.cnae = payload.cnaePrincipalCodigo
    state.empresa.bairro = payload.enderecoBairro
    state.empresa.cep = payload.enderecoCep
    state.empresa.cidade = { id_cidade: payload.enderecoIdCidade, nome: getCidade(payload) }
    state.empresa.numero = payload.enderecoNumero
    state.empresa.endereco = payload.enderecoRua
    state.empresa.id = payload.id
    state.empresa.razaoSocial = payload.razaoSocial
    state.empresa.status = payload.statusEmpresa
    state.empresa.idCorporacao = payload.idCorporacao
    state.empresa.uf = getUf(payload)
  },
  [SET_EMPRESAS_AND_CORPORACOES]: (state, payload) => {
    let allEmpresas = has(payload, 'empresas') ? get(payload, 'empresas', []) : get(payload, 'empresasSemCorporacao', [])
    payload.corporacoes.forEach(corporacao => allEmpresas = allEmpresas.concat(corporacao.empresas))
    state.busca.empresas.list = allEmpresas
    state.busca.empresas.qtd = payload.qtdEmpresas

    state.busca.corporacoes.list = payload.corporacoes
    state.busca.corporacoes.qtd = payload.qtdCorporacoes
  },
  [SET_FILTRO_STATUS]: (state, payload) => {
    state.busca.empresas.filtro.status = payload
  },
  [SET_FILTRO_EMPRESA](state, filtro) {
    for (const key in filtro) {
      if (has(filtro, key)) {
        state.busca.empresas.filtro[key] = filtro[key]
      }
    }
  },
  [SET_FILTRO_CORPORACAO](state, filtro) {
    for (const key in filtro) {
      if (has(filtro, key)) {
        state.busca.corporacoes.filtro[key] = filtro[key]
      }
    }
  }
}

const getters = {
  getGroupMessageIfExists: (state) => {
    const corporacao = state.busca.corporacoes.list.find(c => c.id === state.empresa.idCorporacao)

    if (isNil(corporacao)) {
      return ''
    }
    return `no grupo ${corporacao.nome}`
  },
  getActualId: (state) => {
    if (!isNil(state.empresa.id)) {
      return state.empresa.id
    }
    return state.empresaRegistered.id
  },
  getActualRazaoSocial: (state) => {
    if (!isNil(state.empresa.id)) {
      return state.empresa.razaoSocial
    }
    return state.empresaRegistered.razaoSocial
  },
  empresa: state => state.empresa,
  empresas: state => state.busca.empresas.list,
  existsEmpresa: state => state.busca.empresas.list.some(empresa => empresa.id === state.empresa.id),
  empresaFound: state => !isNil(state.empresa.id),
  empresasFiltered: (state) => {
    let empresasFiltered = state.busca.empresas.list

    if (state.busca.empresas.filtro.status !== STATUS_EMPRESA.TODAS) {
      empresasFiltered = empresasFiltered.filter(e => e.status === state.busca.empresas.filtro.status)
    }

    if (state.busca.empresas.filtro.razaoSocial.length > 0) {
      empresasFiltered = empresasFiltered.filter(e => compareTextLettersOnly(e.razaoSocial, state.busca.empresas.filtro.razaoSocial))
    }
    return empresasFiltered
  },
  corporacoesFiltered: (state) => {
    let corporacoesFiltered = state.busca.corporacoes.list

    if (state.busca.corporacoes.filtro.nome.length > 0) {
      corporacoesFiltered = corporacoesFiltered.filter(e => compareTextLettersOnly(e.nome, state.busca.corporacoes.filtro.nome))
    }
    return corporacoesFiltered
  },
  getFiltroEmpresa: state => state.busca.empresas.filtro,
  getFiltroCorporacao: state => state.busca.corporacoes.filtro,
  hasEmpresas: state => !isEmpty(state.busca.empresas.list),
  hasCorporacoes: state => !isEmpty(state.busca.corporacoes.list),
  qtdEmpresas: state => state.busca.empresas.qtd,
  qtdCorporacoes: state => state.busca.corporacoes.qtd,
  empresaRegistered: state => state.empresaRegistered
}

const actions = {
  async save({ commit, getters }, empresa) {
    if (!getters.existsEmpresa) {
      empresa.cnpj = getters.empresa.cnpj
      empresa.status = STATUS_EMPRESA.ATIVA
      const response = await empresaService.insert(empresa)
      commit(SET_EMPRESA_REGISTERED, response.data)
    } else {
      empresa.status = getters.empresa.status
      await empresaService.update(empresa)
    }
    commit(RESET_EMPRESA)
  },
  async cancel({ commit }) {
    commit(RESET_EMPRESA)
  },
  async createEmpresaDados({ commit, dispatch }, cnpj) {
    commit(SET_STATUS_EMPRESA, STATUS_EMPRESA.ATIVA)
    await dispatch('populateEmpresa', cnpj)
  },
  async populateEmpresa({ commit, state }, cnpj) {
    cnpj = extractOnlyNumbers(cnpj)
    commit(SET_CNPJ, cnpj)
    if (isNil(state.empresa.id)) {
      let response = {}
      try {
        response = await empresaService.findByCnpj(cnpj)
        commit(SET_EMPRESA_BY_CNPJ, response.data)
        // Zero is considered that company is not registered in data base of this user
        return { isRegistered: !isNil(state.empresa.id) && state.empresa.id !== 0 }
      } catch (e) {
        if (e.response.status !== 404 && e.response.status !== 500) { // se não for 400 então lança exceção
          // TODO: ERRO 500 não pode estar aqui, alinhar com time do backend
          throw e
        }
        return { isRegistered: false }
      }
    }
    return null;
  },
  async searchEmpresasAndCorporacoes({ commit }) {
    const response = await empresaService.searchEmpresasAndCorporacoes()
    commit(SET_EMPRESAS_AND_CORPORACOES, response.data)
  },
  async loadEmpresaById({ commit }, id) {
    const response = await empresaService.findById(id)
    commit(SET_EMPRESA_BY_ID, response.data)
  }
}

export default {
  namespaced: true, state, mutations, getters, actions
}
