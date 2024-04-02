<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BDialog from '@/components/BDialog.vue';

const props = defineProps<{
	purchaseId: string
}>()

const dialog = defineModel<boolean>()

</script>
<template>
	<BDialog title="Apakah anda yakin?" v-model="dialog">
		<p class="tw-text-sm tw-text-onSurfaceVariant">
			Proses penghapusan pembelian dengan ID <span class="tw-font-semibold">“{{ purchaseId }}”</span> akan mengakibatkan data tersebut tidak dapat dikembalikan.
		</p>
		<template v-slot:action>
			<BButton label="Batalkan"></BButton>
			<BButton label="Lanjutkan" variant="text" color="error"></BButton>
		</template>
	</BDialog>
</template>