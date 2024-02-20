<script setup lang="ts">
import { ref } from 'vue';
import BIcon from './BIcon.vue';

const model = defineModel<string | null>()
const inputImage = ref<HTMLInputElement | null>(null)
const onChangeFile = () => {
  const file = inputImage.value?.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      model.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}
</script>
<template>
  <div class="tw-border-2 tw-border-dotted tw-w-36 tw-h-36 tw-border-outline tw-flex tw-place-items-center tw-rounded-xl hover:tw-cursor-pointer tw-relative" @click="inputImage?.click()">
    <template  v-if="model">
      <BIcon @click.stop="model = null" icon="close" class="tw-absolute tw-right-1 tw-top-1" color="warning"></BIcon>
      <img :src="model" alt="" class="tw-w-36 tw-h-36 tw-p-1 tw-object-cover tw-rounded-xl">
    </template>
    <div v-else class="tw-text-onSurfaceVariant tw-mx-auto tw-flex tw-items-center tw-gap-1">
      <BIcon icon="upload"></BIcon>
      <span class="tw-text-xs tw-font-semibold">Unggah Foto</span>
      <input type="file" accept="image/png, image/gif, image/jpeg" v-show="false" ref="inputImage" @change="onChangeFile()">
    </div>
  </div>  
</template>