import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from '@/modules/auth/routes'
import supplierRoutes from '@/modules/supplier/routes'
import storage from '@/utils/storage'

export interface RouteChildren {
  path: string
  name: string
  component: () => Promise<any>
  meta?: {
    requiredAuth?: boolean, 
    drawerTitle?: string
  }
}

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
            ...isRequiredAuth,
          }
        },
        ...authRoutes,
        ...supplierRoutes,
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
