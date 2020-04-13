/* eslint-disable no-param-reassign */
import axios from 'axios';
import { get } from 'lodash'
import autenticacaoService from '@/services/autenticacao'
import store from '@/store/index'
import router from '@/router'


// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
// axios.defaults.

// axios.interce

axios.interceptors.request.use((config) => {
  if (config.url.indexOf('authentication/') === -1) {
    config.headers.Authorization = autenticacaoService.getToken()
  }
  return config
})

axios.interceptors.response.use(response => response, (error) => {
  if (get(error, 'response.status') === 401) { // qnd token estiver expirado, desloga automaticamente
    store.dispatch('autenticacao/logout', router)
  }
  console.error(error)
  return Promise.reject(error)
  // return Promise.reject(get(error, 'response.data.err.message'))
})

// let config = {
//   // baseURL: process.env.baseURL || process.env.apiUrl || '"
//   // timeout: 60 * 1000, // Timeout
//   withCredentials: false, // Check cross-site Access-Control
// };

// const _axios = axios.create(config);

// Vue.use(Plugin)

// export default Plugin;
