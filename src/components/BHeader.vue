<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/stores';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import BButton from './BButton.vue';
import BIcon from './BIcon.vue';
import { ref } from 'vue';

const router = useRouter()

const authStore = useAuthStore()

const isLoading = ref<boolean>(true)
const itemRoute: string[] =[
  'Manajemen Data',
  'Daftar Pemasok',
]

onMounted(() => {
  authStore.getUserInformation().catch(e => {
    console.log(e);
  }).finally(() => {
    isLoading.value = false
  })
})

// watch(() => router.currentRoute.value.matched, (matched) => {
//   itemRoute.splice(0, itemRoute.length)
//   matched.forEach((match) => {
//     console.log(match.meta);
    
//     // if (match.meta.title) {
//     //   itemRoute.push(match.meta.title)
//     // }
//   })
// })


</script>
<template>
  <div class="tw-w-full tw-flex tw-justify-between tw-pr-40">
    <div class="tw-flex tw-items-center tw-text-white tw-gap-8">
      <div>
        <div class="tw-flex tw-gap-2 tw-text-sm">
          <BIcon icon="stacks" color="white" filled></BIcon>
          <template v-for="item in itemRoute" :key="item">
            <span>/</span><span class="last:tw-font-semibold tw-opacity-50 last:tw-opacity-100">{{item}}</span>
          </template>
        </div>
        <div class="tw-mt-2 tw-font-semibold">
          {{ itemRoute[itemRoute.length - 1] }}
        </div>
      </div>
      <BIcon icon="menu" color="white"></BIcon>
    </div>
    <VProgressCircular class="tw-self-center" color="green" size="20" width="2" v-if="isLoading" indeterminate />
    <VMenu v-else>
      <template v-slot:activator="{ props }">
        <div class="tw-flex tw-items-center tw-gap-2 tw-text-white" v-bind="props">
          <BIcon icon="person" color="white" filled></BIcon>
          <span>
            {{ authStore.auth?.name }}
          </span>
        </div>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title @click="authStore.logout()">Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </VMenu>
  </div>
</template> 