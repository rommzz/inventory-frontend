<script setup lang="ts">
import BTable from '@/components/BTable.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
type Supplier = {
  readid: string
  name: string
  company: string
  email: string
  phone: string
  logo: string
  address: string
  created_at: string
  deleted_at: string
  updated_at: string
};

const supplier = ref<Supplier[]>([]);

onMounted(() => {
  supplier.value = [
    {
      readid: '1',
      name: 'John Doe 1',
      company: 'John Doe Company 1',
      email: 'email 1',
      address: 'address',
      phone: 'phone',
      logo: 'logo',
      created_at: 'created_at',
      deleted_at: 'deleted_at',
      updated_at: 'updated_at',
    },
    {
      readid: '2',
      name: 'John Doe 2',
      company: 'John Doe Company 2',
      email: 'email 2',
      address: 'address',
      phone: 'phone',
      logo: 'logo',
      created_at: 'created_at',
      deleted_at: 'deleted_at',
      updated_at: 'updated_at',
    },
    {
      readid: '3',
      name: 'John Doe 3',
      company: 'John Doe Company 3',
      email: 'email 3',
      address: 'address cokkk',
      phone: 'phone',
      logo: 'logo',
      created_at: 'created_at',
      deleted_at: 'deleted_at',
      updated_at: 'updated_at',
    },

  ]
})
</script>
<template>
  <div>
    <BTable
      :items="supplier"
      :headers="['Perusahaan', 'Nama', 'Email', 'No. Telepon', 'Alamat', 'Aksi']"
      :showed-item="supplier.map((item) => {
        return {
          company: item.company,
          name: item.name,
          email: item.email,
          phone: item.phone,
          address: item.address,
        };
      })"
      :per-page="20"
      :total-items="100"
      label-add-button="Pemasok Baru"
      @on-click-add="router.push('/data/supplier/add')"
    >
    </BTable>
  </div>
</template>
