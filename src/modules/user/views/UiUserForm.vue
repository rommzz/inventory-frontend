<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BTextField from '@/components/BTextField.vue';
import router from '@/router';
import type { Customer, User } from '@/utils/apis/models/model';
import { onMounted, reactive, ref } from 'vue';
import { useUserStore } from '../stores';
import type { UserForm } from '@/utils/apis/models/request/request';
import { roleList, type Role, type RoleList } from '@/utils/apis/models/commons';
import BSelect from '@/components/BSelect.vue';
import bToast from '@/plugin/btoast';
import { validation } from '@/plugin/validation';

const props = defineProps<{
  id?: string;
}>();

const store = useUserStore();
type Form = {
		name?: string;
    username?: string;
    password?: string;
    email?: string | undefined;
    phone?: string | undefined;
    role?: RoleList;
		address?: string
}
let user = ref<User>()
const showPassword = ref<boolean>(false)
const formField = reactive<Form>({});
const form = ref();
const isLoading = ref<boolean>(false);
const isEdit = props.id !== undefined;

onMounted(() => {
  if (isEdit) {
    // fetch data from API
    getData()
  }
})

const getData = async () => {
  store.getUserDetail(props.id!).then(r => {
    user.value = r
    Object.assign(formField, user.value)
		formField.role = roleList.find(v => v.value == user.value?.role_id)

  }).catch(e => {
    console.log(e);
  })
}

const submit = async () => {
  const valid = await form.value.validate()
  if (valid.valid) {
    const customerForm: UserForm = {
      name: formField.name!,
			username: formField.username!,
			password: formField.password!,
			email: formField.email,
			phone: formField.phone,
			role_id: formField.role!.value,
			address: formField.address,
    }
    isLoading.value = true;
    isEdit ? updateCustomer(customerForm) : createUser(customerForm);
  }
}

const updateCustomer = async (userForm: UserForm): Promise<void> => {
  isLoading.value = true;
  store.updateUser(userForm, props.id!).then(() => {
		bToast('Karyawan berhasil diubah',)
		getData()
	})
	.catch((err) => {
    console.error(err);
		bToast(err.msg ?? err, 'error')
  }).finally(() => isLoading.value = false)
}

const createUser = async (userForm: UserForm) => {
  isLoading.value = true;
  await store.createUser(userForm).then(() => {
    router.replace({path: '/user'});
		bToast('Karyawan berhasil dibuat',)
  }).catch(err => {
		bToast(err.msg ?? err, 'error')
    console.error(err);
  }).finally(() => isLoading.value = false)
}

</script>
<template>
  <VForm class="tw-bg-white tw-rounded-xl tw-p-5 tw-shadow" ref="form">
    <div class="tw-grid tw-grid-cols-2 tw-gap-x-5">
      <BTextField v-model="formField.name" label="Pelanggan" placeholder="Nama Pelanggan" :rules="[ v => !!v || 'Nama pelanggan wajib diisi', ]" required/>
      <BSelect
				:items="roleList"
				v-model="formField.role"
				:item-title="v => v.label"
				label="Role"
				required
				:rules="[ v => !!v || 'Role pelanggan wajib diisi', ]"
			/>
      <BTextField v-model="formField.email" label="Email" placeholder="Email Pelangan"></BTextField>
      <BTextField v-model="formField.phone" label="No. Telephone" type="number" placeholder="No. Telepon Pelanggan"></BTextField>
			<template v-if="!isEdit">
				<BTextField
					v-model="formField.username"
					label="Username"
					placeholder="Username Karyawan"
					required
					:rules="validation.password"
				/>
				<BTextField
					v-model="formField.password"
					label="Password"
					:type="showPassword ? 'text' : 'password'"
					placeholder="Password Karyawan"
					required
					:append-inner-icon="showPassword ? 'visibility_off' : 'visibility'"
					@click:append-inner="showPassword = !showPassword"
					:rules="validation.password"
				/>
			</template>
    </div>
    <BTextField label="Alamat" type="textarea" placeholder="Alamat Pelanggan"></BTextField>
    <div class="tw-flex tw-justify-end tw-gap-5">
      <BButton :disabled="true" variant="outlined" label="Batalkan"></BButton>
      <BButton :is-loading="isLoading" :label="`Simpan ${isEdit ? 'Perubahan  ' : 'Karyawan'}`" @click="submit()"></BButton>
    </div>
  </VForm>
</template>