<script setup lang="ts">
const isLoading = defineModel<boolean>()
</script>
<template>
	<VOverlay
		v-model="isLoading"
		contained
		class="tw-items-center tw-justify-center tw-bg-onPrimary tw-opacity-50 tw-bg-opacity-50"
		persistent
		scrim
	>
	<v-progress-circular
			color="primary"
			indeterminate
			size="64"
			class="tw-z-10"
		></v-progress-circular>
	</VOverlay>
</template>