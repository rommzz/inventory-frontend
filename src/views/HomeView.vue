<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/stores'
import TheWelcome from '../components/TheWelcome.vue'
import BTextField from '@/components/BTextField.vue';
</script>

<template>
  <main class="tw-p-10 tw-ml-10">
    <BTextField label="label"></BTextField>
    <TheWelcome />
    <button @click="useAuthStore().logout()">logout</button>
  </main>
</template>
