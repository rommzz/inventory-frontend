import type { Breadcrumbs, RouteChildren } from '@/router'
import type { RouteRecordRaw } from 'vue-router'

export const itemRoutes: RouteChildren[] = [
  {
    path: '',
    name: 'item-list',
    component: () => import('../views/UiItemList.vue'),
  },
  {
    path: 'add',
    name: 'item-add',
    meta: {
      breadcrumbs: [
        {
          title: 'Tambah Barang Baru',
          path: 'add'
        }
      ],
    },
    component: () => import('../views/UiItemForm.vue'),
  },
  {
    path: ':id',
    name: 'item-edit',
    props: true,
    meta: {
      breadcrumbs: [
        {
          title: 'Edit Barang',
          path: ':id'
        }
      ],
    },
    component: () => import('../views/UiItemForm.vue'),
  }, 
]

const routes: RouteRecordRaw[] = [
  {
    path: '/data/item',
    meta: {
      requiredAuth: true,
      drawerTitle: 'Kelola Barang',
      breadcrumbs: [
        {title: 'Manajemen Data'},
        {title: 'Kelola Barang', path: '/data/item'}
      ] as Breadcrumbs[],
    },
    children: [
      ...itemRoutes
    ]

  },
]

export default routes
