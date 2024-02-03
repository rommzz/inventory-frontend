<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import BDrawer from './components/BDrawer.vue';
import { ref } from 'vue';
import BIcon from './components/BIcon.vue';

const drawer = ref<boolean>(true)
const route = useRoute();
const showLayout = computed<boolean>(() =>
  route.name !== 'login') 
</script>

<template>
  <v-layout class="rounded rounded-md" v-if="showLayout">
    <v-app-bar title="Application bar" elevation="1">
      <template v-slot:prepend>
        <BIcon @click="drawer = !drawer" icon="menu"></BIcon>
      </template>
      <template v-slot:append>
        <BIcon icon="account_circle"></BIcon>
      </template>
    </v-app-bar>
    <BDrawer v-model="drawer" />
    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <RouterView />
    </v-main>
  </v-layout>
  <RouterView v-else/>
</template>
