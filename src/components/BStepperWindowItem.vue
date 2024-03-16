<script setup lang="ts">
import { useSlots } from 'vue';

const props = defineProps<{
  title: string
}>()
const slot = useSlots()
</script>
<template>
  <div>
    <h3 class="tw-p-5">
      {{ props.title }}
    </h3>
    <div class="tw-px-5 tw-pb-5">
      <slot></slot>
    </div>
    <div class="tw-flex tw-content-between tw-p-5" v-if="slot['action']">
      <slot name="action"/>
    </div>
  </div>
</template>