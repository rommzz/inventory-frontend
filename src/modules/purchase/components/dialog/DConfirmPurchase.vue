<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BDialog from '@/components/BDialog.vue';
import type { PurchaseForm } from '@/utils/apis/models/request/purchaseAddRequest';
import { toRaw } from 'vue';
import { usePurchaseStore } from '../../stores';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
	data: PurchaseForm
}>()

const store = usePurchaseStore()
const router = useRouter()

const dialog = defineModel<boolean>()
const loading = ref<boolean>(false)

const submit = async () => {
	loading.value = true
	store.cratePurchase(props.data).then(() => {
		router.replace('/purchase')
		loading.value = false
	})
	.catch(e => {
		console.log(e);
	}).finally(() => {
		loading.value = false
	})
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
			<BButton :disabled="loading" variant="text" label="Batalkan" color="danger" @click="dialog = false"/>
			<BButton :is-loading="loading" label="Lanjutkan" @click="submit"/>
		</template>
	</BDialog>
</template>