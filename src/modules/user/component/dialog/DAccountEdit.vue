<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BDialog from '@/components/BDialog.vue';
import BTextField from '@/components/BTextField.vue';
import { validation } from '@/plugin/validation';
import type { User } from '@/utils/apis/models/model';
import { ref } from 'vue';
import { watch } from 'vue';
import { useUserStore } from '../../stores';
import bToast from '@/plugin/btoast';

const props = defineProps<{
	user: User
}>()

const dialog = defineModel<boolean>()
// const username = ref<string>()
const password = ref<string>()
const repeatPassword = ref<string>()
const isLoading = ref<boolean>(false)
const showPassword = ref<boolean>(false)
const showRepeatPassword = ref<boolean>(false)

const store = useUserStore()

const submit = async (): Promise<void> => {
	store.accountUpdate(
		props.user.username!,
		password.value!,
		props.user.id
	).then(() => {
		bToast('Passwrod Berhasil Diubah', 'success')
		dialog.value = false
	})
}

// watch(dialog, newV => {
// 	if (newV) {
// 		username.value = props.user.username
// 	}
// })

</script>
<template>
	<BDialog
		v-model="dialog"
		title="Ganti Password Karyawan"
		:persistent="isLoading"
		width="512"
	>
		<div>
			<!-- <BTextField
				label="Username"
				required
				v-model="username"
				:rules="validation.username"
			/> -->
			<BTextField
				label="Password"
				required
				v-model="password"
				:rules="validation.password"
				:type="showPassword ? 'text' : 'password'"
				placeholder="Password Karyawan"
				@click:append-inner="showPassword = !showPassword"
				:append-inner-icon="showPassword ? 'visibility_off' : 'visibility'"
			/>
			<BTextField
				label="Ulangi Password"
				required
				v-model="repeatPassword"
				:rules="[
					v => v == password || 'password tidak sama'
				]"
				:type="showRepeatPassword ? 'text' : 'password'"
				placeholder="Ulangi Password"
				@click:append-inner="showRepeatPassword = !showRepeatPassword"
				:append-inner-icon="showRepeatPassword ? 'visibility_off' : 'visibility'"
			/>
		</div>
		<template v-slot:action>
			<BButton
				label="Batalkan"
				variant="text"
				@click="dialog = false"
			/>
			<BButton
				label="Simpan Perubahan"
				:is-loading="isLoading"
				@click="submit"
			/>
		</template>
	</BDialog>
</template>