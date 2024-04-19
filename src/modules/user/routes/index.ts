import type { Breadcrumbs, RouteChildren } from '@/router'
import type { RouteRecordRaw } from 'vue-router'

export const userRoutes: RouteChildren[] = [
  {
    path: '',
    name: 'user-list',
    component: () => import('../views/UiUserList.vue'),
  },
  {
    path: 'add',
    name: 'user-add',
    meta: {
      breadcrumbs: [
        {
          title: 'Karyawan Baru',
          path: 'add'
        }
      ],
    },
    component: () => import('../views/UiUserForm.vue'),
  },
  {
    path: ':id',
    name: 'user-detail',
    props: true,
    meta: {
      breadcrumbs: [
        {
          title: 'Detail Karyawan',
          path: ':id'
        }
      ],
    },
    component: () => import('../views/UiUserDetail.vue'),
  }, 
  {
    path: ':id/edit',
    name: 'user-edit',
    props: true,
    meta: {
      breadcrumbs: [
        {
          title: 'Edit Karyawan',
          path: ':id/edit'
        }
      ],
    },
    component: () => import('../views/UiUserForm.vue'),
  }, 
]

const routes: RouteRecordRaw[] = [
  {
    path: '/user',
    meta: {
			isAdmin: true,
      requiredAuth: true,
      drawerTitle: 'Manajemen Karyawan',
      breadcrumbs: [
        {title: 'Daftar Karyawan', path: '/user'}
      ] as Breadcrumbs[],
    },
    children: [
      ...userRoutes
    ]

  },
]

export default routes
