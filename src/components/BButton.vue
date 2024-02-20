<script setup lang="ts">
import { computed } from 'vue';
import BIcon from './BIcon.vue';
import type { BIconName } from './types/BIcon';
import { pallete } from "@/plugin/palette";
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  class: {
    type: String,
    default: ''
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button'
  },
  variant: {
    type: String as () => "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain",
    default: 'flat'
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  prependIcon: {
    type: String as () => BIconName,
    default: ''
  },
	color: {
		type: String as () => keyof typeof pallete.schemes.light,
		default: 'primary'
	}
})
defineEmits(['click'])
const classProps = computed(() => {
  return props.class})
</script>
<template>
  <VBtn
    :variant="variant"
    class="text-none"
    :class="classProps"
    :loading="isLoading"
    @click="$emit('click')"
    :type="type"
    :disable="disabled"
    :block="fullWidth"
    :color="color"
    rounded="pill"
  >
    <template v-slot:prepend>
      <BIcon :icon="prependIcon" color="onPrimary"></BIcon>
    </template>
    <span class="tw-font-semibold">{{ label }}</span>
  </VBtn>
</template>