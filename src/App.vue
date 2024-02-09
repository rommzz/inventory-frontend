<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import BDrawer from './components/BDrawer.vue';

const drawer = ref<boolean>(true)
const route = useRoute();
const showLayout = computed<boolean>(() =>
  route.name !== 'Login') 
</script>

<template>
  <v-layout class="rounded rounded-md" v-if="showLayout">
    <BDrawer v-model="drawer" />
    <v-main class="tw-ml-16 tw-mt-28">
      <RouterView />
    </v-main>
  </v-layout>
  <RouterView v-else/>
</template>
