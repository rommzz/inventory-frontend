import type { Breadcrumbs, RouteChildren } from '@/router'
import type { RouteRecordRaw } from 'vue-router'

export const supplierRoutes: RouteChildren[] = [
  {
    path: '',
    name: 'supplier-list',
    component: () => import('../views/UiSupplierList.vue'),
  },
  {
    path: 'add',
    name: 'supplier-add',
    meta: {
      breadcrumbs: [
        {
          title: 'Pemasok Baru',
          path: 'add'
        }
      ],
    },
    component: () => import('../views/UiSupplierAdd.vue'),
  }, 
]

const routes: RouteRecordRaw[] = [
  {
    path: '/data/supplier',
    // component: () => import('../views/LoginView.vue'),
    meta: {
      requiredAuth: true,
      drawerTitle: 'Daftar Pemasok',
      breadcrumbs: [{title: 'Manajemen Data'}, {title: 'Daftar pemasok', path: '/data/supplier'}] as Breadcrumbs[],
    },
    children: [
      ...supplierRoutes
    ]

  },
]

export default routes
