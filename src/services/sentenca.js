import Axios from 'axios'

export default {
  search: ({
    termo, ignoreCase, ignoreAccent, versoes
  }) => Axios.post('/api/sentencas/', versoes, { params: { termo, ignoreCase, ignoreAccent } }),
  findOtherVersionsByVersiculoKey: (request) => Axios.post('/api/sentencas/versoes', request)
}
