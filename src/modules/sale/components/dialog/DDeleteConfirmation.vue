<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BDialog from '@/components/BDialog.vue';
import { ref } from 'vue';
import { useSaleStore } from '../../stores';
import { toast } from 'vue3-toastify';

const props = defineProps<{
	saleId: string
}>()

const store = useSaleStore()

const emit = defineEmits<{
	(e: 'successDelete'): void
}>()

const dialog = defineModel<boolean>()

const isDeleting = ref<boolean>(false)

</script>
<template>
	<BDialog
		title="Apakah anda yakin?"
		v-model="dialog"
		:persistent="isDeleting"
	>
		<p class="tw-text-sm tw-text-onSurfaceVariant">
			Proses penghapusan penjualan dengan ID <span class="tw-font-semibold">“{{ saleId }}”</span> akan mengakibatkan data tersebut tidak dapat dikembalikan.
		</p>
		<template v-slot:action>
			<BButton :disabled="isDeleting" label="Batalkan" @click="dialog = false"></BButton>
			<BButton
				:is-loading="isDeleting"
				label="Lanjutkan"
				variant="text"
				color="error"
				@click="async () => {
					isDeleting = true
					store.deleteSale(props.saleId).then(() => {
						emit('successDelete')
					}).catch(e => {
						toast(e.msg ?? e, {
							type: 'error'
						})
					}).finally(() => {
						isDeleting = false
					})
				}"
			/>
		</template>
	</BDialog>
</template>