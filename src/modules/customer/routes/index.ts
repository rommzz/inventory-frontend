import type { Breadcrumbs, RouteChildren } from '@/router'
import type { RouteRecordRaw } from 'vue-router'

export const customerRoutes: RouteChildren[] = [
  {
    path: '',
    name: 'customer-list',
    component: () => import('../views/UiCustomerList.vue'),
  },
  {
    path: 'add',
    name: 'customer-add',
    meta: {
      breadcrumbs: [
        {
          title: 'Pelanggan Baru',
          path: 'add'
        }
      ],
    },
    component: () => import('../views/UiCustomerForm.vue'),
  },
  {
    path: ':id',
    name: 'customer-edit',
    props: true,
    meta: {
      breadcrumbs: [
        {
          title: 'Edit pelanggan',
          path: ':id'
        }
      ],
    },
    component: () => import('../views/UiCustomerForm.vue'),
  }, 
]

const routes: RouteRecordRaw[] = [
  {
    path: '/data/customer',
    meta: {
      requiredAuth: true,
      drawerTitle: 'Daftar Pelanggan',
      breadcrumbs: [
        {title: 'Daftar Pelanggan', path: '/data/customer'}
      ] as Breadcrumbs[],
    },
    children: [
      ...customerRoutes
    ]

  },
]

export default routes
