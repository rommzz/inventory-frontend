<script setup lang="ts">
import { useSlots } from 'vue';
const props = defineProps<{
  title: string;
}>()
const slot = useSlots();
</script>
<template>
  <div class="tw-rounded-xl tw-bg-white tw-p-5 tw-shadow">
    <div class="tw-flex tw-justify-between tw-items-center tw-mb-5">
      <span class="tw-text-2xl tw-text-onSurface">{{ props.title }}</span>
      <slot v-if="slot['action']" name="action"></slot>
    </div>
    <slot ></slot>
  </div>
</template>