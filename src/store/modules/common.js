export const SET_EMPRESA_ITEM_MODULE_ACTIVE = 'SET_EMPRESA_ITEM_MODULE_ACTIVE'

const state = {
  empresa: {
    module: {
      name: '',
    }
  }
}

const mutations = {
  [SET_EMPRESA_ITEM_MODULE_ACTIVE]: (state, module) => {
    state.empresa.module.name = module
  }
}

const getters = {
  itemEmpresaModuleActive: state => state.empresa.module.name
}

const actions = {
}

export default {
  namespaced: true, state, mutations, getters, actions
}
