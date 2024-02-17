import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from '@/modules/auth/routes'
import supplierRoutes from '@/modules/supplier/routes'
import storage from '@/utils/storage'

export interface Breadcrumbs {
  title: string,
  path?: string,
}
export interface RouteChildren {
  path: string
  name: string
  component: () => Promise<any>
  meta?: {
    requiredAuth?: boolean, 
    drawerTitle?: string,
    breadcrumbs?: Breadcrumbs[],
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
          name: 'Dashboard',
          component: () => import('@/views/DashboardView.vue'),
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
  const auth = storage.getToken()
  if (to.matched.some((record) => record.meta.requiredAuth) && !auth) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
