import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import authRoutes from '@/modules/auth/routes'
import supplierRoutes from '@/modules/supplier/routes'
import storage from '@/utils/storage'
import itemRoutes from '@/modules/item/routes'
import customerRoutes from '@/modules/customer/routes'
import purchaseRoutes from '@/modules/purchase/routes'
import stockRoutes from '@/modules/stock/routes'
import saleRoutes from '@/modules/sale/routes'
import userRoutes from '@/modules/user/routes'
import bToast from '@/plugin/btoast'
import { useAuthStore } from '@/modules/auth/stores'

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
          component: () => import('@/modules/dashboard/views/DashboardView.vue'),
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
				...saleRoutes,
				...userRoutes
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const auth = storage.getToken()
	const user = useAuthStore().auth
	console.log(user);
  if (to.matched.some((record) => record.meta.requiredAuth) && !auth) {
    next({ name: 'Login' })
  } else {
		// if (to.matched.some((record) => record.meta.isAdmin) && !(user?.role_id == 'ADMIN')) {
		// 	bToast('Hanya Admin', 'error')
		// 	return
		// }
    next()
  }
})

export default router
