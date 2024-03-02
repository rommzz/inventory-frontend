<script setup lang="ts">
import { onMounted } from 'vue';
import BTextField from './BTextField.vue';

const modelValue = defineModel<string>()
const props = defineProps<{
  label?: string,
  maxDate?: string
  minDate?: string
}>()
onMounted(() => {
  let date = document.querySelector('.date input');
  date?.setAttribute('max', props.maxDate ?? '')
  date?.setAttribute('min', props.minDate ?? '')
  date?.setAttribute('date-date-format', 'dd/mm/yyyy')
})
</script>
<template>
  <BTextField class="date" :label="label ?? ''" v-model="modelValue" type="date"/>
</template>
<style scoped>
.date :deep(input) {
  display: block;
}
</style>