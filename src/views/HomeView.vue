<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/stores'
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main class="tw-pr-40">
    <TheWelcome />
    <button @click="useAuthStore().logout()">logout</button>
  </main>
</template>
