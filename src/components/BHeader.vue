<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/stores';
import { onMounted, ref, watch } from 'vue';
import { useRouter, type RouteLocationNormalizedLoaded } from 'vue-router';
import { type Breadcrumbs } from "@/router";
import BIcon from './BIcon.vue';
import type { BIconName } from './types/BIcon';

const router = useRouter()
const store = useAuthStore()

const isLoading = ref<boolean>(true)
const breadcrumbs = ref<Breadcrumbs[]>([])
const listMenu: {
  title: string,
  icon: BIconName,
  action: () => void,
}[] = [
  {
    title: 'Pengaturan',
    icon: 'settings',
    action: () => {
      
    }
  },
  {
    title: 'Logout',
    icon: 'logout',
    action: () => logout()
  }
]
const logout = async () => {
  isLoading.value = true
  store.logout().catch(e => {
    alert(e)
  }).finally(() => {
    isLoading.value = false
  })
}
const emit = defineEmits(['click:drawer'])

onMounted(() => {
  settingBreadcrumb(router.currentRoute.value)
  store.getUserInformation().catch(e => {
    console.log(e);
  }).finally(() => {
    isLoading.value = false
  })
})

watch(router.currentRoute, (newV) => {
  settingBreadcrumb(newV)
})

const settingBreadcrumb = (newV: RouteLocationNormalizedLoaded) => {
  breadcrumbs.value = []
  breadcrumbs.value.push({
    title: 'Dashboard',
    path: '/',
  })
  newV.matched.forEach((item: any) => {
    if (item.meta) {
      if (typeof item.meta.breadcrumbs !== 'undefined') {
        breadcrumbs.value.push(...item.meta.breadcrumbs as Breadcrumbs[])
      }
    }
  })
}


</script>
<template>
  <div class="tw-w-full tw-flex tw-justify-between">
    <div class="tw-flex tw-items-center tw-text-white tw-gap-8">
      <BIcon @click="emit('click:drawer')" icon="menu" color="white"></BIcon>
      <div>
        <div class="tw-flex tw-gap-2 tw-text-sm">
          <BIcon icon="stacks" color="white" filled></BIcon>
          <template v-for="item, index in breadcrumbs" :key="item">
            <span>/</span>
            <span
              :class="`${index == breadcrumbs.length -1 ? 'tw-font-normal tw-opacity-50' : 'hover:tw-cursor-pointer'}`"
              @click="item.path && router.push(item.path)"
            >
              {{item.title ?? ''}}
            </span>
          </template>
        </div>
        <div class="tw-mt-2 tw-font-semibold">
          {{ breadcrumbs[breadcrumbs.length - 1]?.title ?? '' }}
        </div>
      </div>
    </div>
    <VProgressCircular class="tw-self-center" color="green" size="20" width="2" v-if="isLoading" indeterminate />
    <template v-else>
      <div class="tw-flex tw-items-center tw-gap-2 tw-text-white">
        <VMenu>
          <template v-slot:activator="{ props }">
            <BIcon icon="person" color="white" filled v-bind="props" class="hover:tw-cursor-pointer"/>
          </template>
          <v-list class="!tw-bg-white">
            <v-list-item class="!tw-px-0">
              <v-list-item-title v-for="item, index in listMenu" :key="index" @click="item.action" class="tw-flex tw-items-center tw-gap-3 !tw-py-4 !tw-px-3 tw-border-b tw-border-outlineVariant last:tw-text-warning hover:tw-cursor-pointer hover:tw-bg-surfaceBright last:tw-border-0">
                <BIcon
                  :icon="item.icon"
                  :color="index == listMenu.length -1 ? 'warning' : 'onSurfaceVariant'"
                  filled
                />
                <span>{{ item.title }}</span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </VMenu>
        <span>
          {{ store.auth?.name }}
        </span>
        <span class="tw-ml-2 tw-bg-secondaryContainer tw-lowercase tw-text-onSecondaryContainer tw-py-1 tw-px-4 tw-font-semibold tw-text-sm tw-rounded-lg">
          {{ store.auth?.role_id }}
        </span>
        <BIcon icon="notifications" filled color="onPrimary" class="tw-ml-5"></BIcon>
      </div>
    </template>
  </div>
</template> 