<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BDetailCard from '@/components/BDetailCard.vue';
import BTextField from '@/components/BTextField.vue';
import { useAuthStore } from '@/modules/auth/stores';
import { useUserStore } from '@/modules/user/stores';
import bToast from '@/plugin/btoast';
import { validation } from '@/plugin/validation';
import type { User } from '@/utils/apis/models/model';
import { ref } from 'vue';
import { reactive } from 'vue';
import { onMounted } from 'vue';

const authStore = useAuthStore()
const userStore = useUserStore()
const userForm = reactive<{
	name?: string
	email?: string
	phone?: string
	address?: string
}>({})

const passwordForm = reactive<{
	oldPassword?: string
	newPassword?: string
	repeatPassword?: string
}>({})

const repeatPassword = ref()

const updatingData = ref<boolean>(false)
const updatingPassword = ref<boolean>(false)

const pForm = ref()

const fillForm = (user: User) => {
	userForm.name = user?.name
	userForm.email = user?.email
	userForm.phone = user?.phone
	userForm.address = user?.address
}

onMounted(() => {
	const user = authStore.auth
	if (user) {
		fillForm(user)
	} else {
		authStore.getUserInformation().then(() => {
			fillForm(authStore.auth!)
		})
	}
})

const submit = async () => {
	const user = authStore.auth!
	updatingData.value = true
	userStore.updateUser({
		name: userForm.name!,
		role_id: user.role_id!,
		username: user.name!,
		address: userForm.address,
		email: userForm.email,
		phone: userForm.phone
	}, authStore.auth?.id!).then(() => {
		bToast('Data berhasil diubah', 'success')
		authStore.getUserInformation(true)
	}).catch(e => bToast(e.msg ?? e, 'error')).finally(() => updatingData.value = false)
}

const submitPassword = async () => {
	const valid = await pForm.value.validate()
	if (!valid.valid) return
	updatingPassword.value = true
	setTimeout(() => {
		updatingPassword.value = false
	}, 300);
}

</script>
<template>
	<div>
		<BDetailCard title="Informasi Dasar" class="tw-mb-4">
			<form>
				<BTextField
					label="Nama"
					required
					v-model="userForm.name"
				/>
				<div class="tw-grid tw-grid-cols-2 tw-gap-5">
					<BTextField
						label="Email"
						v-model="userForm.email"
					/>
					<BTextField
						label="No. Telepon"
						type="tel"
						v-model="userForm.phone"
					/>
				</div>
				<BTextField
					label="Alamat"
					type="textarea"
					v-model="userForm.address"
				/>
				<div class="tw-text-right">
					<BButton label="Simpan Perubahan" @click="submit" :is-loading="updatingData"/>
				</div>
			</form>
		</BDetailCard>
		<BDetailCard title="Informasi Dasar" class="tw-mb-8">
			<VForm ref="pForm">
				<BTextField
					label="Password Sekarang"
					:rules="validation.password"
					v-model="passwordForm.oldPassword"
				/>
				<BTextField
					label="Password Baru"
					:rules="validation.password"
					v-model="passwordForm.newPassword"
					@update:model-value="() => {
						pForm.items[2].validate()
					}"
				/>
				<BTextField
					label="Ulangi Password Baru"
					:rules="[
						...validation.password,
						() => passwordForm.newPassword == passwordForm.repeatPassword || 'password tidak cocok'
					]"
					v-model="passwordForm.repeatPassword"
					:ref="repeatPassword"
				/>
				<div class="tw-text-right">
					<BButton label="Ubah Password" @click="submitPassword" :is-loading="updatingPassword"/>
				</div>
			</VForm>
		</BDetailCard>
	</div>
</template>