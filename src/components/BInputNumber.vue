<script setup lang="ts">
import { watch } from 'vue';
import BIcon from './BIcon.vue';

const value = defineModel<number>()
const props  = defineProps<{
  label: string,
  hideButton?: boolean
  class?: string 
}>()

watch(value, newVal => {
  if (!newVal || newVal == 0) {
    value.value = 0
  }
})
</script>
<template>
  <VTextField
    :label="props.label"
    v-model.number="value"
    variant="outlined"
    hide-details
    class="b-input-number"
    :class="props.class"
  >
    <template v-slot:prepend-inner v-if="!hideButton">
      <div @click="(value ?? 0) > 1 && (value!)--">
        <BIcon class="tw-cursor-pointer" icon="remove"></BIcon>
      </div>
    </template>
    <template v-slot:append-inner v-if="!hideButton">
      <div @click="(value!)++">
        <BIcon class="tw-cursor-pointer" icon="add"></BIcon>
      </div>
    </template>
  </VTextField>
</template>
<style scoped>
.b-input-number {
  max-width: fit-content;
}
.b-input-number :deep(.v-input__control) {
  width: 160px;
}
</style>