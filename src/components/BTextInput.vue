<script setup lang="ts">
import { QInput } from 'quasar';
import { computed } from 'vue';
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
  size: {
    type: String,
    default: 'sm'
  },
  placeholder: {
    type: String,
    default: '',
  },
  outlined: {
    type: Boolean,
    default: true
  },
  class: {
    type: String,
    default: ''
  },
  clearable: {
    type: Boolean,
    default: false
  }
})
const classProps = computed(() => {
  return props.class})
</script>
<template>
  <QInput
    v-model="model"
    :type="type"
    :label="label"
    :size="size"
    :placeholder="placeholder"
    :outlined="outlined"
    :clearable="clearable"
    :class="classProps"
  />
</template>