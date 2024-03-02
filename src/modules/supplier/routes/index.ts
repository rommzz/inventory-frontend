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
    component: () => import('../views/UiSupplierForm.vue'),
  },
  {
    path: ':id',
    name: 'supplier-edit',
    props: true,
    meta: {
      breadcrumbs: [
        {
          title: 'Edit Pemasok',
          path: ':id'
        }
      ],
    },
    component: () => import('../views/UiSupplierForm.vue'),
  }, 
]

const routes: RouteRecordRaw[] = [
  {
    path: '/data/supplier',
    meta: {
      requiredAuth: true,
      drawerTitle: 'Daftar Pemasok',
      breadcrumbs: [
        {title: 'Daftar pemasok', path: '/data/supplier'}
      ] as Breadcrumbs[],
    },
    children: [
      ...supplierRoutes
    ]

  },
]

export default routes
