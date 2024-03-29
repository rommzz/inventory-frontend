import type { Breadcrumbs, RouteChildren } from '@/router'
import type { RouteRecordRaw } from 'vue-router'

export const purchaseRoutes: RouteChildren[] = [
  {
    path: '',
    name: 'purchase-list',
    component: () => import('../views/UiPurchaseList.vue'),
  },
  {
    path: 'add',
    name: 'purchase-add',
    meta: {
      breadcrumbs: [
        {
          title: 'Pemasok Baru',
          path: 'add'
        }
      ],
    },
    component: () => import('../views/UiPurchaseForm.vue'),
  },
  {
    path: ':id',
    name: 'purchase-detail',
    props: true,
    meta: {
      breadcrumbs: [
        {
          title: 'Detail Pembelian',
          path: ':id'
        }
      ],
    },
    component: () => import('../views/UiPurchaseDetail.vue'),
  }, 
]

const routes: RouteRecordRaw[] = [
  {
    path: '/purchase',
    meta: {
      drawerTitle: 'Pembelian',
      requiredAuth: true,
      breadcrumbs: [
        {title: 'Pembelian', path: '/purchase'}
      ] as Breadcrumbs[],
    },
    children: [
      ...purchaseRoutes
    ]

  },
]

export default routes
