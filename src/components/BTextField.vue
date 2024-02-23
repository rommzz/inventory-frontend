<script setup lang="ts">
import { computed, defineModel } from 'vue';
import BIcon from './BIcon.vue';
import type { BIconName } from './types/BIcon';

const model = defineModel()
const props = defineProps<{
  label: string,
  type?: "number" | "text" | "date" | "time" | "email" | "password" | "textarea" | "search" | "tel" | "file" | "url" | "datetime-local",
  placeholder?: string,
  class?: string,
  clearable?: boolean,
  required?: boolean,
  appendInnerIcon?: BIconName,
  prependInnerIcon?: BIconName,
  rules?: string[] | ((value: string) => string | boolean)[],
  density?: "comfortable" | "compact" | "default",
  hideDetails?: boolean,
  modelValue?: any
}>()

const emit = defineEmits<{
  (e: 'click:appendInner'): void
  (e: 'click:prependInner'): void
  (e: 'update:modelValue', value: any): void
}>()

const classProps = computed(() => {
  return props.class})
</script>

<template>
  <div :class="classProps">
    <div v-if="label" :for="label" class="tw-font-semibold tw-text-sm tw-mb-2">{{ label }}</div>
    <VTextarea
      v-if="type == 'textarea'"
      variant="outlined"
      :density="props.density ?? 'comfortable'"
      color="primary"
      label=""
      :required="required"
      :type="type"
      :placeholder="placeholder"
      :clearable="clearable"
      v-model="model"
      :rules="rules"
      :hide-details="hideDetails"
    >
      <template v-slot:append-inner v-if="appendInnerIcon">
        <BIcon :icon="appendInnerIcon" @click="emit('click:appendInner')"></BIcon>
      </template>
      <template v-slot:prepend-inner v-if="prependInnerIcon">
        <BIcon :icon="prependInnerIcon" @click="emit('click:appendInner')"></BIcon>
      </template>
    </VTextarea>
    <VTextField
      v-else
      variant="outlined"
      :density="props.density ?? 'comfortable'"
      color="primary"
      label=""
      :required="required"
      :type="type"
      :placeholder="placeholder"
      :clearable="clearable"
      v-model="model"
      :rules="rules"
      :hide-details="hideDetails"
      @update:model-value="model => $emit('update:modelValue', model)"
    >
      <template v-slot:append-inner v-if="appendInnerIcon">
        <BIcon :icon="appendInnerIcon" @click="emit('click:appendInner')"></BIcon>
      </template>
      <template v-slot:prepend-inner v-if="prependInnerIcon">
        <BIcon :icon="prependInnerIcon" @click="emit('click:appendInner')"></BIcon>
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