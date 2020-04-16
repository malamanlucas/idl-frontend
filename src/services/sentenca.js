import Axios from 'axios'

export default {
  search: ({ termo, ignoreCase, ignoreAccent }) => Axios.get('/api/sentencas/',
    { params: { termo, ignoreCase, ignoreAccent } })
}
