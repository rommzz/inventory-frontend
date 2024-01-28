<script setup lang="ts">
import { computed } from 'vue';
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
    color="primary"
    rounded="pill"
  >
    {{ label }}
  </VBtn>
</template>