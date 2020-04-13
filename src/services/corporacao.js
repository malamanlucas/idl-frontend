import Axios from 'axios'

const buildSaveParams = corporacao => ({
  nome: corporacao.nome,
  empresas: corporacao.empresas.map(e => e.id)
})

export default {
  update: (corporacao) => {
    const params = buildSaveParams(corporacao)
    return Axios.put(`/corporacao/${corporacao.id}`, params)
  },
  insert: (corporacao) => {
    const params = buildSaveParams(corporacao)
    return Axios.post('/corporacao', params)
  }
}
