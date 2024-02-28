<script setup lang="ts">
import { ref } from 'vue';
import BIcon from './BIcon.vue';
import { computed } from 'vue';

const model = defineModel<string | null>()
const props = defineProps<{
  class?: string
  accept?: string
}>()
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
const classProps = computed(() => props.class)
</script>
<template>
  <div
    class="tw-border-2 tw-border-dotted tw-w-36 tw-h-36 tw-border-outline tw-flex tw-place-items-center tw-rounded-xl hover:tw-cursor-pointer tw-relative"
    :class="classProps"
    @click="inputImage?.click()"
  >
    <template  v-if="model">
      <BIcon @click.stop="model = null" icon="close" class="tw-absolute tw-right-1 tw-top-1" color="warning"></BIcon>
      <img :src="model" alt="" class="tw-w-36 tw-h-36 tw-p-1 tw-object-cover tw-rounded-xl">
    </template>
    <div v-else class="tw-text-onSurfaceVariant tw-mx-auto tw-flex tw-items-center tw-gap-1">
      <BIcon icon="upload"></BIcon>
      <span class="tw-text-xs tw-font-semibold">Unggah file</span>
      <input type="file" :accept="accept" v-show="false" ref="inputImage" @change="onChangeFile()">
    </div>
  </div>  
</template>