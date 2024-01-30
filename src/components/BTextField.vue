<script setup lang="ts">
import { computed } from 'vue';
import { defineModel, defineProps, defineEmits } from 'vue';
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
  <VTextField
    variant="outlined"
    density="comfortable"
    color="primary"
    :required="required"
    :label="label"
    :type="type"
    :placeholder="placeholder"
    :class="classProps"
    :clearable="clearable"
    v-model="model"
    :rules="rules"
  >
    <template v-slot:append-inner v-if="appendInnerIcon">
      <BIcon :icon="appendInnerIcon" @click="emit('click:appendInner')"></BIcon>
    </template>
  </VTextField>
</template>