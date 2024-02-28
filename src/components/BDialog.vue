<script setup lang="ts">
const model = defineModel<boolean>()
const props = defineProps<{
	title?: string
	persistent?: boolean
	width?: number
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
		<div class="tw-mt-4 tw-text-onSurfaceVariant tw-text-sm">
			<slot></slot>
		</div>
	</div>
</VDialog>
</template>