import type { Breadcrumbs, RouteChildren } from '@/router'
import type { RouteRecordRaw } from 'vue-router'

export const stockRoutes: RouteChildren[] = [
  {
    path: '',
    name: 'stock-list',
    component: () => import('../views/UiStockList.vue'),
  },
]

const routes: RouteRecordRaw[] = [
  {
    path: '/data/stock',
    meta: {
      requiredAuth: true,
      drawerTitle: 'Manajemen Data',
      breadcrumbs: [
        {title: 'Daftar Harga Barang', path: '/data/stock'}
      ] as Breadcrumbs[],
    },
    children: [
      ...stockRoutes
    ]

  },
]

export default routes
