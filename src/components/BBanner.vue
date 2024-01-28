<script setup lang="ts">
import { computed } from 'vue';

type BBannerProperties = {
  borderColor: string,
  backgroundColor: string,
  textColor: string,
  icon: string,
}

const props = defineProps({
  fillWidth: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    default: ''
  },
  type: {
    type: String as () => "default" | "error",
    default: 'default'
  }
})
const classProps = computed(() => {
  return props.class
})
const bannerProperties = (): BBannerProperties => {
  switch (props.type) {
    case 'error':
      return {
        borderColor: 'tw-border-error',
        backgroundColor: 'tw-bg-errorContainer',
        textColor: 'tw-text-onErrorContainer',
        icon: 'mdi-alert-outline'
      }
    default:
      return {
        borderColor: 'tw-border-primary',
        backgroundColor: 'tw-bg-primaryContainer',
        textColor: 'tw-text-onPrimaryContainer',
        icon: 'mdi-information-outline'
      }
  }

}
</script>
<template>
  <div :class='`tw-items-center tw-rounded-lg tw-border-[1px] tw-py-2 tw-px-4 tw-flex tw-gap-4 tw-text-sm ${fillWidth ? "tw-w-80" : "tw-w-full"} ${classProps} ${bannerProperties().backgroundColor} ${bannerProperties().borderColor} ${bannerProperties().textColor}`'>
    <VIcon :icon="bannerProperties().icon"/>
    <span>{{ message }}</span>

  </div>
</template>