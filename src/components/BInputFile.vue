<script setup lang="ts">
import { ref } from 'vue';
import BIcon from './BIcon.vue';
import { computed } from 'vue';

const model = defineModel<string | null>()
const props = defineProps<{
  class?: string
  accept?: string
}>()
const fileName = ref<string>()
const inputImage = ref<HTMLInputElement | null>(null)
const onChangeFile = () => {
  const file = inputImage.value?.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      model.value = e.target?.result as string
			fileName.value = file.name
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
    <div class="tw-text-onSurfaceVariant tw-mx-auto tw-flex tw-items-center tw-gap-1 tw-overflow-hidden">
			<v-tooltip
				v-if="model"
				activator="parent"
				location="top"
			>
				{{fileName}}
			</v-tooltip>
      <BIcon v-if="!model" icon="upload"></BIcon>
      <span class="tw-text-xs tw-font-semibold">{{ model ? fileName : 'Unggah File' }}</span>
      <input type="file" :accept="accept" v-show="false" ref="inputImage" @change="onChangeFile()">
    </div>
  </div>  
</template>