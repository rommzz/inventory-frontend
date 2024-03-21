<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BTextField from '@/components/BTextField.vue';
import router from '@/router';
import type { Customer } from '@/utils/apis/models/model';
import { onMounted, reactive, ref } from 'vue';
import { useCustomerStore } from '../stores';
import type { CustomerForm } from '@/utils/apis/models/request/request';

const props = defineProps<{
  id?: string;
}>();

const store = useCustomerStore();
type Form = {
  company?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  logo?: string;
}
let customer = ref<Customer>()
const formField = reactive<Form>({});
const form = ref();
const isLoading = ref<boolean>(false);
const isEdit = props.id !== undefined;

onMounted(() => {
  // isEdit.value = props.id !== undefined;
  if (isEdit) {
    // fetch data from API
    getData()
  }
})

const getData = async () => {
  store.getCustomer(props.id!).then(r => {
    customer.value = r
    formField.company = r.company_name
    formField.name = r.name
    formField.email = r.email,
    formField.phone = r.phone
    formField.address = r.address
  }).catch(e => {
    console.log(e);
  }).finally(() => {
    console.log('ok');
    
  })
}

const submit = async () => {
  const valid = await form.value.validate()
  if (valid) {
    const customerForm: CustomerForm = {
      name: formField.name!,
      company_name: formField.company!,
      email: formField.email,
      phone: formField.phone,
      address: formField.address,
    }
    isLoading.value = true;
    isEdit ? updateCustomer(customerForm) : createCustomer(customerForm);
    isLoading.value = false;
  }
}

const updateCustomer = async (customerForm: CustomerForm): Promise<void> => {
  isLoading.value = true;
  let data = customerForm
  await store.editCustomer({
    ...data,
    id: customer.value!.id!
  }).catch((err) => {
    console.error(err);
  })
}

const createCustomer = async (cusomerForm: CustomerForm) => {
  isLoading.value = true;
  await store.addCustomer(cusomerForm).then((res) => {
    router.push('/data/customer/' + res.id);
  }).catch((err) => {
    console.error(err);
  });
}

</script>
<template>
  <VForm class="tw-bg-white tw-rounded-xl tw-p-5 tw-shadow" ref="form">
    <div class="tw-grid tw-grid-cols-2 tw-gap-x-5">
      <BTextField v-model="formField.name" label="Pelanggan" placeholder="Nama Pelanggan" :rules="[ v => !!v || 'Nama pelanggan wajib diisi', ]" required/>
      <BTextField v-model="formField.company" label="Perusahaan" placeholder="Nama PerusahaanPelanggan"></BTextField>
      <BTextField v-model="formField.email" label="Email" placeholder="Email Pelangan"></BTextField>
      <BTextField v-model="formField.phone" label="No. Telephone" type="tel" placeholder="No. Telepon Pelanggan"></BTextField>
    </div>
    <BTextField label="Alamat" type="textarea" placeholder="Alamat Pelanggan" v-model="formField.address"></BTextField>
    <div class="tw-flex tw-justify-end tw-gap-5">
      <BButton :disabled="true" variant="outlined" label="Batalkan"></BButton>
      <BButton :is-loading="isLoading" :label="`Simpan ${isEdit ? 'Perubahan  ' : 'Pelanggan'}`" @click="submit()"></BButton>
    </div>
  </VForm>
</template>