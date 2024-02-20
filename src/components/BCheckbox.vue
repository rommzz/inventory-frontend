<script setup lang="ts">
import type { VCheckbox } from 'vuetify/components';


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
  <VCheckbox
    v-model="model"
    :label="label"
    base-color="primary"
    color="primary"
    density="compact"
    hide-details
  />
</template>