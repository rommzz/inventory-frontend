<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import BDrawer from './components/BDrawer.vue';
import { ref } from 'vue';
import BIcon from './components/BIcon.vue';

const drawer = ref<boolean>(true)
const route = useRoute();
const showLayout = computed<boolean>(() =>
  route.name !== 'Login') 
</script>

<template>
  <v-layout class="rounded rounded-md" v-if="showLayout">
    <BDrawer v-model="drawer" />
    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <RouterView />
    </v-main>
  </v-layout>
  <RouterView v-else/>
</template>
