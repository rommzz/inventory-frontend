<script setup lang="ts">
import BDialog from '@/components/BDialog.vue';
import type { User } from '@/utils/apis/models/model';
import { ref } from 'vue';
import { useUserStore } from '../../stores';
import bToast from '@/plugin/btoast';
import BButton from '@/components/BButton.vue';

const dialog = defineModel<boolean>()
const isDeleting = ref<boolean>(false)
const deleteDialogData = defineModel<User>('userData')
const store = useUserStore()

const deleteUser = async (userId: string) => {
	isDeleting.value = true
	try {
		await store.deleteUser(userId)
		bToast('Data berhasil dihapus')
		deleteDialogData.value = undefined
		emit('onDelete')
	} catch (error) {
		console.log(error);
		bToast((error as any).msg ?? error, 'error')

	}
	isDeleting.value = false
}

const emit = defineEmits<{
	(e: 'onDelete'): void
	(e: 'onFailDelete'): void
}>()

</script>
<template>
	<BDialog
		title="Apakah anda yakin?"
		v-model="dialog"
		:persistent="isDeleting"
	>
		<div class="">
			<p class="tw-text-onSurfaceVariant tw-text-sm">
				Proses penghapusan data karyawan dengan nama “<b>{{ deleteDialogData?.name }}</b>” akan mengakibatkan data tersebut tidak dapat dikembalikan.
			</p>
			<div class="tw-p-5 tw-text-right tw-pt-8">
				<BButton class="tw-mr-2" label="Batalkan" @click="dialog = false"></BButton>
				<BButton @click="deleteUser(deleteDialogData!.id!)" :is-loading="isDeleting"  variant="text" color="danger" label="Lanjutkan"></BButton>
			</div>
		</div>
	</BDialog>
</template>