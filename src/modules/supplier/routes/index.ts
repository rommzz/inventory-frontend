import type { RouteChildren } from '@/router'
import type { RouteRecordRaw } from 'vue-router'

export const supplierRoutes: RouteChildren[] = [
  {
    path: '',
    name: 'supplier-list',
    component: () => import('../views/UiSupplierList.vue'),
    meta: {
      drawerTitle: 'Daftar Pemasok',
      requiredAuth: true,
    }
  }
]

const routes: RouteRecordRaw[] = [
  {
    path: '/data/supplier',
    // component: () => import('../views/LoginView.vue'),
    children: [
      ...supplierRoutes
    ]

  },
]

export default routes
