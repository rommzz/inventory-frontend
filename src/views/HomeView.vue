<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/stores';
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <TheWelcome />
    <button @click="useAuthStore().logout()">logout</button>
  </main>
</template>
