<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BTextField from '@/components/BTextField.vue';
import router from '@/router';
import type { Supplier } from '@/utils/apis/models/model';
import type { SupplierForm } from '@/utils/apis/models/request';
import { onMounted, reactive, ref } from 'vue';
import { useCustomerStore } from '../stores';

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
let supplier: Supplier = {}
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
  store.getSupplier(props.id!).then(r => {
    supplier = r
    formField.company = r.company_name
    formField.name = r.name
    formField.email = r.email,
    formField.phone = r.phone
    formField.address = r.address
    formField.logo = r.logo
  }).catch(e => {
    console.log(e);
  }).finally(() => {
    console.log('ok');
    
  })
}

const submit = async () => {
  const valid = await form.value.validate()
  if (valid) {
    isLoading.value = true;
    isEdit ? updateSupplier() : createSupplier();
    isLoading.value = false;
  }
}

const updateSupplier = () => {
  isLoading.value = true;
  const supplierForm: Supplier = {
    name: formField.name!,
    company_name: formField.company!,
    email: formField.email,
    phone: formField.phone,
    address: formField.address,
  }
  const data = Object.assign(supplier, supplierForm)
  console.log(data);
  
  store.editSupplier(data).then((res) => {
    console.log(res);
    router.go(0)
  }).catch((err) => {
    console.error(err);
  }).finally(() => {
    isLoading.value = false;
  });
}

const createSupplier = () => {
  isLoading.value = true;
  const supplierForm: SupplierForm = {
    name: formField.name!,
    company_name: formField.company!,
    email: formField.email,
    phone: formField.phone,
    address: formField.address,
  }
  store.addCustomer(supplierForm).then((res) => {
    router.push('/data/customer/' + res.id);
  }).catch((err) => {
    console.error(err);
  }).finally(() => {
    isLoading.value = false;
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
    <BTextField label="Alamat" type="textarea" placeholder="Alamat Pelanggan" ></BTextField>
    <div class="tw-flex tw-justify-end tw-gap-5">
      <BButton :disabled="true" variant="outlined" label="Batalkan"></BButton>
      <BButton :is-loading="isLoading" :label="`Simpan ${isEdit ? 'Perubahan  ' : 'Pelanggan'}`" @click="submit()"></BButton>
    </div>
  </VForm>
</template>