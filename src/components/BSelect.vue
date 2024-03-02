<script setup lang="ts" generic="T">
import { computed } from 'vue';
import { defineModel } from 'vue';
import type { BIconName } from './types/BIcon';
import BIcon from './BIcon.vue';

const model = defineModel<T | T[]>()
const props = defineProps<{
  label: string,
  itemTitle: (item: T) => string,
  items: T[],
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
  loading?: boolean,
  multiple?: boolean,
}>()

const emit = defineEmits<{
  (e: 'click:appendInner'): void
  (e: 'click:prependInner'): void
  (e: '@update:model-value', value: T | T[]): void
}>()

const classProps = computed(() => {
  return props.class})
</script>

<template>
  <div :class="classProps">
    <div v-if="label" :for="label" class="tw-font-semibold tw-text-sm tw-mb-2">
      {{ label }} <span v-if="required" class="tw-text-primary">*</span>
    </div>
    <VSelect
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
      :items="items"
      item-props
      :item-title="itemTitle"
      return-object
      :loading="loading"
      :multiple="multiple"
      @update:model-value="v => emit('@update:model-value', v)"
    >
      <template v-slot:append-inner v-if="appendInnerIcon">
        <BIcon :icon="appendInnerIcon" @click="emit('click:appendInner')"></BIcon>
      </template>
      <template v-slot:prepend-inner v-if="prependInnerIcon">
        <BIcon :icon="prependInnerIcon" @click="emit('click:appendInner')"></BIcon>
      </template>
    </VSelect>
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