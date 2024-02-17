<script setup lang="ts">
import { computed } from 'vue';
import type { BIconName } from './types/BIcon';
import { pallete } from "@/plugin/palette";

const props = defineProps<{
  icon: BIconName,
  size?: '16' | '18' | '24' | '36' | '48',
  color?: keyof typeof pallete.schemes.light,
  class?: string
  filled?: boolean
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
    :class="`material-symbols-outlined tw-text-onSurfaceVariant tw-max-w-fit ${props.class ?? ''} ${props.color ? 'text-' + props.color : ''}`"
    :style="`font-variation-settings: 'FILL' ${filled ? 1 : 0}; font-size: ${props.size}px;`"
  >
    {{ props.icon }}
  </span>
</template>