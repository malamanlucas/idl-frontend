import Vue from 'vue';
import Router from 'vue-router';
import autenticacaoService from '@/services/autenticacao'
import adminRouter from '@/views/Admin/adminRouter'
import Dashboard from '@/views/Home/Dashboard'
import Login from '@/views/Autenticacao/Login';
import SessionExpired from '@/views/Autenticacao/SessionExpired'
import Unauthorized from '@/views/Autenticacao/Unauthorized'
import NotFound from '@/views/Autenticacao/NotFound'
import Home from '@/views/Home'

Vue.use(Router);

const homeRouter = {
  path: '/',
  name: 'home',
  component: Home,
  children: [
    adminRouter,
    { path: 'dashboard', name: 'dashboard', component: Dashboard }
  ]
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    homeRouter,
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/erro/sessaoExpirada',
      name: 'sessionExpired',
      component: SessionExpired,
    },
    {
      path: '/erro/naoAutorizado',
      name: 'unauthorized',
      component: Unauthorized,
    },
    {
      path: '/404',
      name: 'notFound',
      component: NotFound,
    }
  ],
});

function isPublicPage(to) {
  return to.path === '/404' || to.path.includes('/erro/')
}

function isPrivatePage(to) {
  // TODO: Todas as páginas abaixo de /admin devem
  // ter permissões específicas de acesso
  return to.path.includes('/admin') || homeRouter.children.some(r => r.name === to.name)
}

function isLoginPage(to) {
  return to.name === 'login'
}

function isHomePage(to) {
  return to.path === '/'
}

function isFromAnyPrivatePage(from) {
  return isPrivatePage(from)
}

router.beforeEach(async (to, from, next) => {
  if (isPrivatePage(to)) {
    if (autenticacaoService.isAuthenticated()) {
      next()
    } else if (isFromAnyPrivatePage(from)) {
      next({ name: 'sessionExpired' })
    } else {
      next({ name: 'unauthorized' })
    }
  } else if (isPublicPage(to)) {
    next()
  } else if (isHomePage(to)) {
    if (!autenticacaoService.isAuthenticated()) {
      next({ name: 'login' })
    } else {
      next({ name: 'dashboard' })
    }
  } else if (isLoginPage(to)) { // at this point the user is not authenticated
    if (!autenticacaoService.isAuthenticated()) {
      next()
    } else {
      next({ name: 'dashboard' })
      // router.push({ name: 'dashboard' })
    }
  } else { // page notFound
    next({ name: 'notFound' })
  }
})

export default router
