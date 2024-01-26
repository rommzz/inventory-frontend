<script setup lang="ts">
import { QCheckbox } from 'quasar';



  const model = defineModel<boolean>()
  defineProps({
    label: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'sm'
    },
    class: {
      type: String,
      default: ''
    }
  })
</script>
<template>
  <QCheckbox v-model="model" :label="label" :size="size" />
</template>