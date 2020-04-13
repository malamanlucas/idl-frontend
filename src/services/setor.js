import Axios from 'axios'
import { isNil } from 'lodash'


export default {
  searchSetores: idEmpresa => Axios.get(`/setor/empresa/${idEmpresa}`),
  searchSetor: idSetor => Axios.get(`/setor/${idSetor}`),
  save: (setor, idEmpresa) => {
    const params = {
      setor: setor.name,
      is_active: setor.status,
      id_empresa: idEmpresa,
      riscos: setor.riscos.map(r => r.value),
      exames: setor.exames.map(e => e.value)
    }

    if (!isNil(setor.id)) { // atualiza
      return Axios.put(`/setor/${setor.id}`, params)
    }

    return Axios.post('/setor', params)
  }
}
