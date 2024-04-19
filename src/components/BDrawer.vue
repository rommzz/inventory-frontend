<script lang="ts" setup>
import { ref } from 'vue';
import type { BIconName } from './types/BIcon';
import BIcon from './BIcon.vue';
import { useRouter } from 'vue-router';
import type { pallete } from '@/plugin/palette';
import logo from "@/assets/img/main-logo.svg";
import { onMounted } from 'vue';

const expandedMenus = ref<string[]>([])

const router = useRouter()

interface Menu {
  title: string,
  icon: BIconName,
  route?: string,
  children?: {
    title: string,
    routeName?: string,
  }[],
  iconColor?: keyof typeof pallete.schemes.light,
}
const menus: Menu[] = [
  {
    title: 'Dashboard',
    icon: 'home',
    iconColor: 'primary',
    route: '/',
  },
  {
    title: 'Manajemen Data',
    icon: 'folder',
    iconColor: 'warning',
    children: [
      // {
      //   title: 'Jenis Satuan',
      // },
      {
        title: 'Daftar Pemasok',
        routeName: 'supplier-list',
      },
      {
        title: 'Kelola Barang',
        routeName: 'item-list',
      },
      {
        title: 'Daftar Harga Barang',
				routeName: 'stock-list',
			},
      {
        title: 'Daftar Pelanggan',
        routeName: 'customer-list',
      },
      // {
      //   title: 'Promo Member',
      // },
    ]
  },
  {
    title: 'Pembelian',
    icon: 'archive',
    iconColor: 'info',
    route: '/purchase',
  },
  {
    title: 'Penjualan',
    icon: 'unarchive',
    iconColor: 'success',
		route: '/sale',
  },
  {
    title: 'Laporan',
    icon: 'analytics',
    iconColor: 'danger',
    children: [
      {title: 'Penjualan per Periode',},
      {title: 'Laba Rugi per Periode',},
      {title: 'Stok Per Barang',},
    ]
  },
  {
    title: 'Manajemen Karyawan',
    icon: 'people',
    iconColor: 'seed',
		route: '/user',
  }
]
const model = defineModel<boolean>()


const isCurrentRoute = (target: string) => {
  return router.currentRoute.value.matched.some(r => r.meta.drawerTitle == target) || target == router.currentRoute.value.name
}
const isChildRoute = (childRoute: string[]) => {
  return childRoute.includes(router.currentRoute.value.name as string)
}

const onClickMenu = (menu: Menu) => {
  if (menu.children?.length) {
    if (expandedMenus.value.includes(menu.title)) {
      expandedMenus.value = expandedMenus.value.filter((item) => item !== menu.title)
    } else {
      expandedMenus.value.push(menu.title)
    }
  } else if (menu.route) {
    router.push(menu.route)
  }
}

onMounted(() => {
  menus.forEach((menu) => {
    menu.children?.forEach(children => {
      if (children.routeName == router.currentRoute.value.name && children.routeName != undefined) {
        expandedMenus.value.push(menu.title)
      }
    })
  })
})
</script>
<template>
  <v-navigation-drawer v-model="model" width="320" color="onPrimary" class="!tw-h-5/6 !tw-mx-9 !tw-top-10 !tw-bottom-10 tw-rounded-xl !tw-border-0 " id="drawer">
    <div class="tw-flex tw-items-center tw-gap-2 tw-justify-center my-6">
      <img :src="logo" alt="" class="tw-w-10">
      <!-- <VImg :src="logo" class="tw-w-10"></VImg> -->
      <div class="tw-text-onSurface tw-text-lg tw-font-semibold">
        Wiranata Parts
      </div>
    </div>
    <VDivider></VDivider>
    <VList class="tw-m-4">
      <div v-for="menu in menus" :key="menu.title" class="tw-mb-2 tw-text-sm tw-text-onSurfaceVariant">
        <div
          v-ripple="{class: 'tw-delay-0'}"
          class=" tw-flex tw-items-center tw-gap-3 tw-rounded tw-py-4 px-6 hover:tw-cursor-pointer hover:tw-bg-surfaceBright" @click="onClickMenu(menu)"
          :class="{'tw-bg-surfaceBright tw-font-semibold tw-text-onSurface': isCurrentRoute(menu.title) || isChildRoute(menu.children?.map(item => item.routeName ?? '') ?? [])}"
        >
          <BIcon :icon="menu.icon" :filled="isCurrentRoute(menu.title) || isChildRoute(menu.children?.map(item => item.routeName ?? '') ?? [])" :color="menu.iconColor" size="18"></BIcon>
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
              :key="submenu.title"
              @click="router.push({ name: submenu.routeName })"
              class="tw-p-4 tw-pl-[53px] mt-1 tw-bg-opacity-0 hover:tw-cursor-pointer hover:tw-text-onSurface hover:tw-font-semibold"
              :class="{'tw-bg-opacity-0 tw-font-semibold hover:tw-bg-opacity-100 tw-text-onSurface': isCurrentRoute(submenu.routeName ?? '')}"
            >
              {{ submenu.title }}
            </div>
          </div>
        </VExpandTransition>
      </div>
    </VList>
  </v-navigation-drawer>
</template>
<style scoped>
/* width */
#drawer :deep(.v-navigation-drawer__content)::-webkit-scrollbar {
  width: 12px;
}

/* Track */
#drawer :deep(.v-navigation-drawer__content)::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 5px grey;  */
  border-radius: 0px;
}
 
/* Handle */
#drawer :deep(.v-navigation-drawer__content)::-webkit-scrollbar-thumb {
  background: grey; 
  border-radius: 10px;
}

/* Handle on hover */
#drawer :deep(.v-navigation-drawer__content)::-webkit-scrollbar-thumb:hover {
  background: #d1d1d1; 
}
</style>