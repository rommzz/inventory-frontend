import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: 'login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: 'register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue')
  }
]

export default routes
