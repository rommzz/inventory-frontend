<script setup lang="ts">
import { computed } from 'vue';
import type { BIconName } from './types/BIcon';

const props = defineProps<{
  icon: BIconName,
  size?: '18' | '24' | '36' | '48',
  color?: string
  class?: string
}>()

const iconSize = computed(() => {
  if (props.size === '18') {
    return '!tw-text-lg'
  } else if (props.size === '24') {
    return '!tw-text-2xl'
  } else if (props.size === '36') {
    return '!tw-text-4xl'
  } else if (props.size === '48') {
    return '!tw-text-5xl'
  } else {
    return '!tw-text-2xl'
  }
})

</script>
<template>
  <span
    :class="`material-icons-outlined ${iconSize} tw-text-onSurfaceVariant tw-max-w-fit hover:tw-cursor-pointer ${props.class ?? ''} ${props.color ?? ''}`"
  >
    {{ props.icon }}
  </span>
</template>