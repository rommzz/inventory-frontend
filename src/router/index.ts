import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import authRoutes from '@/modules/auth/routes'
import supplierRoutes from '@/modules/supplier/routes'
import storage from '@/utils/storage'
import itemRoutes from '@/modules/item/routes'
import customerRoutes from '@/modules/customer/routes'
import purchaseRoutes from '@/modules/purchase/routes'
import stockRoutes from '@/modules/stock/routes'

export interface Breadcrumbs {
  title: string,
  path?: string,
}
export interface RouteChildren {
  path: string
  name: string
  props?: boolean | Record<string, any> | ((to: RouteLocationNormalized) => Record<string, any>);
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
        ...itemRoutes,
        ...customerRoutes,
        ...purchaseRoutes,
				...stockRoutes,
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
