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
    path: ':id/edit',
    name: 'item-edit',
    props: true,
    meta: {
      breadcrumbs: [
        {
          title: 'Edit Barang',
          path: ':id/edit'
        }
      ],
    },
    component: () => import('../views/UiItemForm.vue'),
  },
	{
    path: ':id',
    name: 'item-detail',
    props: true,
    meta: {
      breadcrumbs: [
        {
          title: 'Detail Barang',
          path: ':id'
        }
      ],
    },
    component: () => import('../views/UiItemDetail.vue'),
  }, 
]

const routes: RouteRecordRaw[] = [
  {
    path: '/data/item',
    meta: {
      requiredAuth: true,
      drawerTitle: 'Manajemen Data',
      breadcrumbs: [
        {title: 'Kelola Barang', path: '/data/item'}
      ] as Breadcrumbs[],
    },
    children: [
      ...itemRoutes
    ]

  },
]

export default routes
