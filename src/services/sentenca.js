import Axios from 'axios'

export default {
  search: (termo, ignoreCase = true) => Axios.get('/api/sentencas/format', { params: { termo, ignoreCase } })
}
