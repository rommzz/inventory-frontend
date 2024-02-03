import { createRouter, createWebHistory } from 'vue-router'
import auth from '@/modules/auth/routes'
import storage from '@/utils/storage'
export const isRequiredAuth = {
  requiredAuth: true
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/HomeView.vue'),
          meta: {
            ...isRequiredAuth
          }
        },
        ...auth
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const auth = storage.getAuth()
  if (to.matched.some((record) => record.meta.requiredAuth) && !auth) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
