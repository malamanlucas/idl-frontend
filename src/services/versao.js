import Axios from 'axios'

export default {
  findAll: () => Axios.get('/api/versao/')
}
