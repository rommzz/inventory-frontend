import type { Breadcrumbs, RouteChildren } from '@/router'
import type { RouteRecordRaw } from 'vue-router'

export const saleRoutes: RouteChildren[] = [
  {
    path: '',
    name: 'sale-list',
    component: () => import('../views/UiSaleList.vue'),
  },
  {
    path: 'add',
    name: 'sale-add',
    meta: {
      breadcrumbs: [
        {
          title: 'Buat Penjualan',
          path: 'add'
        }
      ],
    },
    component: () => import('../views/UiSaleForm.vue'),
  },
  {
    path: ':id',
    name: 'sale-detail',
    props: true,
    meta: {
      breadcrumbs: [
        {
          title: 'Detail Penjualan',
          path: ':id'
        }
      ],
    },
    component: () => import('../views/UiPurchaseDetail.vue'),
  }, 
]

const routes: RouteRecordRaw[] = [
  {
    path: '/sale',
    meta: {
      drawerTitle: 'Penjualan',
      requiredAuth: true,
      breadcrumbs: [
        {title: 'Penjualan', path: '/sale'}
      ] as Breadcrumbs[],
    },
    children: [
      ...saleRoutes
    ]

  },
]

export default routes
