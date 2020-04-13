import Axios from 'axios';

export default {
  search: async (data) => {
    const {
      page,
      perPage,
      column,
      desc,
      filters
    } = data

    const body = { filters, sort: { column, desc } }
    const params = { page, perPage }

    return Axios.post('/funcionarios', body, { params })
  }
}
