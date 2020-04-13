import Axios from 'axios'
import { isNil } from 'lodash'

export default {
  buscaCidades: (estado) => {
    if (isNil(estado)) {
      return { data: [] }
    }
    return Axios.get(`location/buscarLocalizacao/${estado}/`)
  }
}
