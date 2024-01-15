<script setup lang="ts">
import { numToString } from '@/utils/global'
import { ref } from 'vue'
import { useAuthStore } from '../stores'

const email = ref<string>('')
const password = ref<string>('')
const store = useAuthStore()
</script>
<template>
  <div>
    <h1>Login</h1>
    <div>
      <label for="email"></label>
      <input type="text" id="email" v-model="email" />
    </div>
    <div>
      <label for="password"></label>
      <input type="password" id="password" v-model="password" />
    </div>
    <button type="button" @click="store.login(email, password)">login</button>
  </div>
</template>
