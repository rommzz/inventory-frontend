<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores'
import BButton from '@/components/BButton.vue';
import BTextField from '@/components/BTextField.vue';
import BCheckbox from '@/components/BCheckbox.vue';
import logo from "@/assets/img/main-logo.svg";
import BBanner from '@/components/BBanner.vue';

const email = ref<string>('')
const password = ref<string>('')
const isRemember = ref<boolean>(false)
const showPassword = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const store = useAuthStore()
const isError = ref<boolean>(false)

const login = async () => {
  isLoading.value = true
  isError.value = false
  setTimeout(() => {
    isLoading.value = false
    isError.value = true
  }, 1000);
}
</script>
<template>
  <div class="tw-max-w-md tw-mx-auto tw-border-2 tw-rounded-xl tw-py-9 tw-border-outlineVariant tw-relative lg:tw-mt-40 tw-bg-onPrimary">
    <VOverlay
      v-model="isLoading"
      contained
      class="tw-items-center tw-justify-center tw-bg-onPrimary tw-opacity-50 tw-bg-opacity-50"
      persistent
      scrim
    >
    <v-progress-circular
        color="primary"
        indeterminate
        size="64"
        class="tw-z-10"
      ></v-progress-circular>
    </VOverlay>
    <VForm class="tw-p-8" @submit.prevent ref="form">
      <div class="tw-text-center tw-text-onSurface">
        <VImg :src="logo" width="85" class="tw-mx-auto tw-mb-4"></VImg>
        <div class="tw-text-2xl tw-mb-1">
          Selamat Datang
        </div>
        <div class="tw-text-sm">
          Silakan masukkan akun anda untuk masuk
        </div>
      </div>
      <BBanner
        v-if="isError"
        message="Informasi yang anda masukkan salah. Silakan coba lagi"
        class="tw-mt-4"
        type="error"
      />
      <BTextField
        label="Username"
        placeholder="example@email.com"
        v-model="email"
        required
        class="tw-mt-10"
      />
      <BTextField
        label="Kata Sandi"
        :type="showPassword ? 'text' : 'password'"
        v-model="password"
        required
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="showPassword = !showPassword"
      />
      <div class="tw-flex tw-justify-between tw-items-center tw-mb-8">
        <BCheckbox label="Ingat Saya" v-model="isRemember" ></BCheckbox>
        <BButton label="Lupa kata sandi" variant="text"></BButton>
      </div>
      <BButton
        type="submit"
        label="Masuk"
        @click="login()"
        full-width
      />
    </VForm>
  </div>
</template>
