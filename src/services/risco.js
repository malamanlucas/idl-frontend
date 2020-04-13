import Axios from 'axios'

export default {
  search: () => Axios.get('/admin/riscos'),
  searchById: idRisco => Axios.get(`/admin/riscos/${idRisco}`)
}
