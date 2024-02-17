<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import BDrawer from './components/BDrawer.vue';
import BHeader from './components/BHeader.vue';
import { onMounted } from 'vue';

const drawer = ref<boolean>(true)
const route = useRoute();
const showLayout = computed<boolean>(() => route.name !== 'Login' && route.name !== undefined) 
onMounted(() => {
  console.log(route.name);
})

</script>
<template>
  <v-layout class="rounded rounded-md" v-if="showLayout">
    <div class="tw-bg-primary tw-h-[300px] tw-w-screen tw-absolute -tw-z-50"></div>
    <BDrawer v-model="drawer" />
    <v-main class="tw-ml-16 tw-mt-10 tw-mr-10">
      <BHeader @click:drawer="drawer = !drawer"/>
      <RouterView class="tw-mt-12"/>
    </v-main>
  </v-layout>
  <RouterView v-else/>
</template>
