<script setup lang="ts">
import type { QBtn } from 'quasar';
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
  }
})
defineEmits(['click'])
const classProps = computed(() => {
  return props.class})
</script>
<template>
  <QBtn
    @click="$emit('click')"
    :label="label"
    :disable="disabled"
    :class="{'full-width': fullWidth, classProps}"
  />
</template>