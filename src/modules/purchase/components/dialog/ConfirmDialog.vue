<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BDialog from '@/components/BDialog.vue';
import type { PurchaseForm } from '@/utils/apis/models/request/purchaseAddRequest';
import { toRaw } from 'vue';

const props = defineProps<{
	data: PurchaseForm
}>()

const dialog = defineModel<boolean>()

const submit = () => {
	console.log(toRaw(props.data));
}

</script>
<template>
	<BDialog
		v-model="dialog"
		title="Apakah anda yakin?"
		persistent
	>
		<div>
			Pastikan semua data pembelian sudah benar, sebelum menyelesaikan pembelian.
		</div>
		<template v-slot:action>
			<BButton variant="text" label="Batalkan" color="danger" @click="dialog = false"/>
			<BButton label="Lanjutkan" @click="submit"/>
		</template>
	</BDialog>
</template>