<script setup lang="ts">
import BIcon from './BIcon.vue';
import type { BIconName } from './types/BIcon';

const props = defineProps<{
	icon: BIconName,
  title: string,
	data?: string,
}>()
</script>
<template>
	<div
		class="tw-flex tw-items-center tw-gap-4 tw-p-4"
	>
		<BIcon :icon="props.icon"></BIcon>
		<div>
			<div class="tw-text-onSurfaceVariant tw-font-semibold tw-text-xs">{{ props.title }}</div>
			<span>{{ props?.data ?? '-' }}</span>
		</div>
	</div>
</template>