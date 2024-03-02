<script setup lang="ts">
import { useSlots } from 'vue';

const slot = useSlots();
const model = defineModel<boolean>()
const props = defineProps<{
	title?: string
	persistent?: boolean
	width?: number |string
}>()
</script>
<template>
<VDialog
	v-model="model"
	:width="width ?? 320"
	:persistent="persistent"
>
	<div class="tw-bg-white tw-rounded-3xl tw-shadow">
		<div class="tw-pt-6 tw-px-6 tw-text-2xl tw-text-onSurface">
			{{ props.title ?? 'Title' }}
		</div>
		<div class="tw-mt-4 tw-text-onSurfaceVariant tw-text-sm tw-px-6">
			<slot></slot>
		</div>
		<div v-if="slot['action']" class="tw-mt-8 tw-px-6 tw-pb-6 tw-flex tw-justify-end tw-items-center tw-gap-2">
			<slot name="action"></slot>
		</div>
	</div>
</VDialog>
</template>