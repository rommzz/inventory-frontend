<script setup lang="ts">
import { computed } from 'vue';
import { defineModel } from 'vue';
import type { BIconName } from './types/BIcon';
import BIcon from './BIcon.vue';

const model = defineModel<string>()
const props = defineProps<{
  label: string,
  type?: "number" | "text" | "date" | "time" | "email" | "password" | "textarea" | "search" | "tel" | "file" | "url" | "datetime-local",
  placeholder?: string,
  class?: string,
  clearable?: boolean,
  required?: boolean,
  appendInnerIcon?: BIconName,
  rules?: string[] | ((value: string) => string | boolean)[],
}>()

const emit = defineEmits<{
  (e: 'click:appendInner'): void
}>()

const classProps = computed(() => {
  return props.class})
</script>

<template>
  <div :class="classProps">
    <label :for="label" class="tw-font-semibold tw-text-sm tw-mb-2">{{ label }}</label>
    <VTextField
      variant="outlined"
      density="comfortable"
      color="primary"
      label=""
      :required="required"
      :type="type"
      :placeholder="placeholder"
      :clearable="clearable"
      v-model="model"
      :rules="rules"
    >
      <template v-slot:append-inner v-if="appendInnerIcon">
        <BIcon :icon="appendInnerIcon" @click="emit('click:appendInner')"></BIcon>
      </template>
    </VTextField>
  </div>
</template>
<style scoped>
.v-input :deep(.v-field) {
  border-radius: 8px;
}

.v-input :deep(.v-input__details) {
  padding: 0;
}
</style>