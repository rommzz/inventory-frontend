<script lang="ts" setup>
import { ref } from 'vue';
import type { BIconName } from './types/BIcon';
import BIcon from './BIcon.vue';
import { useRouter } from 'vue-router';

const expandedMenus = ref<string[]>([])

const router = useRouter()

interface Menu {
  title: string,
  icon: BIconName,
  children?: string[]
}
const menus: Menu[] = [
  {
    title: 'Dashboard',
    icon: 'home',
  },
  {
    title: 'Manajemen Data',
    icon: 'folder',
    children: [
      'Jenis Satuan',
      'Daftar Pemasok',
      'Kelola Barang',
      'Daftar Harga Barang',
      'Daftar Pelanggan',
      'Promo Member',
    ]
  },
  {
    title: 'Pembelian',
    icon: 'archive',
    children: [
      'Barang dari Pemasok',
      'Riwayat Pembelian',
      'Pembayaran Pembelian',
    ]
  },
  {
    title: 'Penjualan',
    icon: 'unarchive',
    children: [
      'Penjualan ke Pelanggan',
      'Riwayat Penjualan',
      'Pembayaran Penjualan',
    ]
  },
  {
    title: 'Laporan',
    icon: 'analytics',
    children: [
      'Penjualan per Periode',
      'Laba Rugi per Periode',
      'Stok Per Barang',
    ]
  },
  {
    title: 'Manajemen Karyawan',
    icon: 'people',
  }
]
const model = defineModel<boolean>()

const routeNavigation = (target: string) => {
  const to = target.toLowerCase().replace(' ', '-')
  router.push({ path: to })
}

const isCurrentRoute = (target: string) => {
  const currentPath = router.currentRoute.value.path;
  const to = target.toLowerCase().replace(' ', '-')
  if (currentPath == '/') {
    return to === 'dashboard'
  }
  return currentPath === `/${to}`
}

const onClickMenu = (menu: Menu) => {
  if (menu.children?.length) {
    if (expandedMenus.value.includes(menu.title)) {
      expandedMenus.value = expandedMenus.value.filter((item) => item !== menu.title)
    } else {
      expandedMenus.value.push(menu.title)
    }
  } else {
    routeNavigation(menu.title.toLowerCase() == 'dashboard' ? '/' : menu.title);
  }
}
</script>
<template>
  <v-navigation-drawer v-model="model" width="320" class="bg-surface">
    <VList class="tw-m-4">
      <div v-for="menu in menus" :key="menu.title" class="">
        <div
          v-ripple="{class: 'tw-delay-0'}"
          class="tw-flex tw-items-center tw-gap-3 tw-rounded-full tw-p-4 tw-bg-opacity-0 hover:tw-bg-opacity-5 hover:tw-cursor-pointer tw-bg-onSurface " @click="onClickMenu(menu)"
          :class="{'tw-bg-secondaryContainer tw-bg-opacity-100 tw-font-semibold hover:tw-bg-opacity-100': isCurrentRoute(menu.title)}"
        >
          <BIcon :icon="menu.icon"></BIcon>
          <div class="tw-flex-grow">
            {{ menu.title }}
          </div>
          <div class="tw-pr-2" >
            <BIcon v-if="menu.children?.length" class="tw-transition-all" icon="expand_more" :class="{'tw-rotate-180': expandedMenus.includes(menu.title)}"></BIcon>
          </div>
        </div>
        <VExpandTransition>
          <div v-show="expandedMenus.includes(menu.title)">
            <div
              v-for="submenu in menu.children"
              :key="submenu"
              @click="routeNavigation(submenu)"
              class="tw-rounded-full tw-p-4 tw-pl-[53px] mt-1 tw-bg-onSurface tw-bg-opacity-0 hover:tw-bg-opacity-5 hover:tw-cursor-pointer"
              :class="{'tw-bg-secondaryContainer tw-bg-opacity-100 tw-font-semibold hover:tw-bg-opacity-100': isCurrentRoute(submenu)}"
            >
              {{ submenu }}
            </div>
          </div>
        </VExpandTransition>
      </div>
    </VList>
  </v-navigation-drawer>
</template>