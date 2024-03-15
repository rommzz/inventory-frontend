<script setup lang="ts">
import { onMounted } from 'vue';
import BTextField from './BTextField.vue';

const modelValue = defineModel<string>()
const props = defineProps<{
  label?: string,
  maxDate?: string
  minDate?: string
  rules?: string[] | ((value: string) => string | boolean)[],
}>()

onMounted(() => {
  let date = document.querySelector('.date input');
  date?.setAttribute('max', props.maxDate ?? '')
  date?.setAttribute('min', props.minDate ?? '')
  date?.setAttribute('date-date-format', 'dd/mm/yyyy')
})
</script>
<template>
  <BTextField
    class="date"
    :label="label ?? ''"
    v-model="modelValue"
    type="date"
    :rules="rules"
  />
</template>
<style scoped>
.date :deep(input) {
  display: block;
}
</style>