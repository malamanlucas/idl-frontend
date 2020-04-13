import AdminView from './AdminView'
import ChangePassword from './ChangePassword'
import CreateNewUser from './CreateNewUser'

export default {
  path: 'admin/',
  name: 'admin',
  component: AdminView,
  children: [
    { path: 'changePassword', name: 'change-password', component: ChangePassword },
    { path: 'user/create', name: 'create-new-user', component: CreateNewUser }
  ]
}
