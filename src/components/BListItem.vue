<script setup lang="ts">
import BIcon from './BIcon.vue';
import type { BListItemProps } from './types/BListItem';

const props = defineProps<BListItemProps>()
</script>
<template>
	<div
		class="tw-flex tw-items-center tw-gap-4 tw-p-4"
		:class="props.class"
	>
		<BIcon :color="props.color" :icon="props.icon"></BIcon>
		<div :class=" props.color ? `text-${props.color}` : ''">
			<div
				class="tw-text-onSurfaceVariant tw-font-semibold tw-text-xs"
				:class="`text-${props.color}`"
			>{{ props.title }}</div>
			<span :class="props.classData + `text-${props.color}`">{{ props?.data }}</span>
		</div>
		<VSpacer/>
		<BIcon
			:color="props.color"
			v-if="props.rightIcon"
			:icon="props.rightIcon"
		/>
	</div>
</template>