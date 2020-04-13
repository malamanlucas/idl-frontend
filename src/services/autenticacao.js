import Cookies from 'js-cookie'
import { isNil } from 'lodash'
import Axios from 'axios'
import jsonWebToken from 'jsonwebtoken'


const getTempoExpiracao = (jwtDecrypted) => {
  const date = new Date(jwtDecrypted.exp * 1000)
  console.log(date)
  return date
}

export default {
  login: (username, password) => {
    const params = {
      Username: username,
      Password: password
    }
    return Axios.post('/authentication/loginUserPassword/', params)
  },
  requestNewPassword: username => Axios.post('/authentication/senha/solicitarNova', { email: username }),
  changePassword: (hash, password) => Axios.post('/authentication/senha/alterar', { hash, senha: password }),
  saveCookie: (content) => {
    const jwtDecrypted = jsonWebToken.decode(content.authentication)
    Cookies.set('user_token', content.authentication, { expires: getTempoExpiracao(jwtDecrypted) })
    return jwtDecrypted
  },
  deleteCookie: () => Cookies.remove('user_token'),
  isAuthenticated: () => !isNil(Cookies.get('user_token')),
  getToken: () => Cookies.get('user_token')
}
