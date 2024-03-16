<script setup lang="ts">
import logo from "@/assets/img/main-logo.svg";
import BBanner from '@/components/BBanner.vue';
import BButton from '@/components/BButton.vue';
import BCheckbox from '@/components/BCheckbox.vue';
import BTextField from '@/components/BTextField.vue';
import { ref } from 'vue';
import { useAuthStore } from '../stores';

const username = ref<string>('')
const password = ref<string>('')
const isRemember = ref<boolean>(false)
const showPassword = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const store = useAuthStore()
const isError = ref<string>()
const form = ref()

const bypass = () => {
  if (import.meta.env.DEV) {
    const {VITE_USERNAME, VITE_USERPASS} = import.meta.env
    username.value = VITE_USERNAME
    password.value = VITE_USERPASS
  }
}

const login = async () => {
  const valid = await form.value.validate()
  if (!valid.valid) return
  isLoading.value = true
  store.login(username.value, password.value).catch((error) => {
    isError.value = error.msg ?? error
  }).finally(() => {
    isLoading.value = false
  })
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
        <VImg :src="logo" width="85" class="tw-mx-auto tw-mb-4" @dblclick="bypass()"></VImg>
        <div class="tw-text-2xl tw-mb-1">
          Selamat Datang
        </div>
        <div class="tw-text-sm">
          Silakan masukkan akun anda untuk masuk
        </div>
      </div>
      <BBanner
        v-if="isError"
        :message="isError"
        class="tw-mt-4"
        type="error"
      />
      <BTextField
        label="Username"
        placeholder="example@email.com"
        v-model="username"
        required
        class="tw-mt-10"
        :rules="[
          v => !!v || 'Username harus diisi',
        ]"
      />
      <BTextField
        label="Kata Sandi"
        class="tw-mt-2"
        :type="showPassword ? 'text' : 'password'"
        v-model="password"
        required
        :append-inner-icon="showPassword ? 'visibility_off' : 'visibility'"
        @click:append-inner="showPassword = !showPassword"
        :rules="[ v => !!v || 'Password harus diisi', ]"
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
