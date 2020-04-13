import Axios from 'axios'
import { isNil } from 'lodash'

export default {
  searchFuncoes: idEmpresa => Axios.get(`/funcao/empresa/${idEmpresa}`),
  findById: (idEmpresa, idFuncao) => Axios.get(`/funcao/${idFuncao}`),
  save: (funcao, idEmpresa) => {
    const params = {
      nome: funcao.name,
      status: funcao.status,
      id_empresa: idEmpresa,
      riscos: funcao.riscos.map(r => r.value),
      exames: funcao.exames.map(e => e.value)
    }

    if (!isNil(funcao.id)) { // atualiza
      return Axios.put(`/funcao/${funcao.id}`, params)
    }

    return Axios.post('/funcao', params)
  }
}
