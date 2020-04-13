import Axios from 'axios'

export default {
  search: () => Axios.get('/admin/exames')
}
