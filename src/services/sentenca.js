import Axios from 'axios'

export default {
  search: ({ termo, ignoreCase }) => Axios.get('/api/sentencas/format', { params: { termo, ignoreCase } })
}
