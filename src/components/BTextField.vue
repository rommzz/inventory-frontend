<script setup lang="ts">
import { computed } from 'vue';
import { defineModel, defineProps, defineEmits } from 'vue';

const model = defineModel<string>()
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  type: {
    type: String as () => "number" | "text" | "date" | "time" | "email" | "password" | "textarea" | "search" | "tel" | "file" | "url" | "datetime-local",
    default: 'text'
  },
  placeholder: {
    type: String,
    default: '',
  },
  class: {
    type: String,
    default: ''
  },
  clearable: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  appendInnerIcon: {
    type: String,
    default: null
  },
})

const emit = defineEmits<{
  (e: 'click:appendInner'): void
}>()

const classProps = computed(() => {
  return props.class})
</script>
<template>
  <VTextField
    variant="outlined"
    dense
    color="primary"
    :required="required"
    :label="label"
    :type="type"
    :placeholder="placeholder"
    :class="classProps"
    :clearable="clearable"
    v-model="model"
    :append-inner-icon="appendInnerIcon"
    @click:append-inner="emit('click:appendInner')" 
  />
</template>