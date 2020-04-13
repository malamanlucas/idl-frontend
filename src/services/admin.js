import Axios from 'axios'
import autenticacao from '@/services/autenticacao'

const adminService = {
  createNewUser: username => Axios.post('/admin/gerarUsuarioSenha', { Email: username, NivelAcesso: 0 }),
  createUserAndPassword: async (username, password) => {
    await adminService.createNewUser(username)
    const responseRequestNewPassword = await autenticacao.requestNewPassword(username)
    const { hash } = responseRequestNewPassword.data
    await autenticacao.changePassword(hash, password)
  },
  changePasswordOfUser: (username, password) => Axios.post('/admin/trocarSenhaUsuario', { username, password })
}

export default adminService
