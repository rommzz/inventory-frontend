<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores'
import BCheckbox from '@/components/BCheckbox.vue';
import BTextInput from '@/components/BTextInput.vue';
import BButton from '@/components/BButton.vue';

const email = ref<string>('')
const password = ref<string>('')
const isRemember = ref<boolean>(false)
const store = useAuthStore()
</script>
<template>
  <div>
    <div class="">
      <h1>Login</h1>
      <BTextInput
        label="Email"
        v-model="email"
      />
      <BTextInput
        label="Password"
        class="q-mt-md"
        type="password"
        v-model="password"
      />
      <BCheckbox label="Ingat saya" v-model="isRemember" />
      <BButton
        label="Masuk"
        @click="store.login(email, password)"
        full-width
      />
    </div>
  </div>
</template>
