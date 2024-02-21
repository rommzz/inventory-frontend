<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BSelect from '@/components/BSelect.vue';
import BTextField from '@/components/BTextField.vue';
import { useMetaStore } from "@/stores/meta";
import type { Supplier, Unit } from '@/utils/apis/models/model';
import { computed } from 'vue';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  id?: string;
}>();

const metaStore = useMetaStore();

type Merk = {
  id: string;
  merk: string;
}

const listMerk: Merk[] = [
  { id: '1', merk: 'Merk 1' },
  { id: '2', merk: 'Merk 2' },
  { id: '3', merk: 'Merk 3' },
  { id: '4', merk: 'Merk 4' },
  { id: '5', merk: 'Merk 5' },
]
const listSupplier = ref<Supplier[]>([]);
const listUnit = computed(() => metaStore.units);

const form = ref();
const sku = ref<string>('');
const name = ref<string>('');
const purchasePrice = ref<number>(0);
const inventoryPrice = ref<number>(0);
const initalStock = ref<number>(0);
const selectedMerk = ref<Merk>();
const selectedSupplier = ref<Supplier>();
const selectedUnit = ref<Unit>();

const unitLoading = ref<boolean>(false);

const isLoading = ref<boolean>(false);
const isEdit = props.id !== undefined;

const getSupplier = async () => {
  // fetch data from API
  listSupplier.value = [
    {
      id: '1',
      name: 'Supplier 1',
      address: 'Jl. Supplier 1',
      phone: '08123456789',
    },
    {
      id: '2',
      name: 'Supplier 2',
      address: 'Jl. Supplier 2',
      phone: '08123456789',
    },
    {
      id: '3',
      name: 'Supplier 3',
      address: 'Jl. Supplier 3',
      phone: '08123456789',
    },
  ]
}
const getUnit = async () => {
  unitLoading.value = true;
  if (metaStore.units.length == 0) {
    metaStore.getListUnits().catch(e => {
      console.log(e);
    }).finally(() => {
      setTimeout(() => {
        unitLoading.value = false;
      }, 1500);
    });
  }
}

onMounted(() => {
  getSupplier();
  getUnit();
  if (isEdit) {
    // fetch data from API
    
  }
})

const submit = async () => {
  const valid = await form.value.validate()
  if (valid) {
    isLoading.value = true;
    setTimeout(() => {
      isEdit ? updateSupplier() : createSupplier();
      isLoading.value = false;
    }, 5000);
  }
}

const updateSupplier = () => {
  // console.log('update', formField);
}

const createSupplier = () => {
  // console.log('create', formField);
}

</script>
<template>
  <VForm class="tw-bg-white tw-rounded-xl tw-p-5 tw-shadow" ref="form">
    <div class="tw-grid tw-grid-cols-2 tw-gap-x-5">
      <BTextField v-model="sku" label="SKU" placeholder="SKU Barang" :rules="[ v => !!v || 'SKU harus diisi', ]"></BTextField>
      <BTextField v-model="name" label="Nama" placeholder="Nama Barang"></BTextField>
    </div>
    <div class=" tw-grid tw-grid-cols-3 tw-gap-x-5">
      <BSelect label="Merk" :items="listMerk" v-model="selectedMerk" :item-title="(item) => item.merk" placeholder="Merk Barang"/>
      <BSelect label="Pemasok" :items="listSupplier" v-model="selectedSupplier" :item-title="(item) => item.name ?? ''" placeholder="Pemasok Barang"/>
      <BSelect label="Satuan" :items="listUnit" :loading="unitLoading" v-model="selectedUnit" :item-title="(item) => item.name" placeholder="Satuan Barang"/>
      <BTextField v-model="purchasePrice" label="Harga Beli" placeholder="Harga Beli Barang"/>
      <BTextField v-model="inventoryPrice" type="text" label="Harga Persediaan" placeholder="Harga Persediaan Barang"></BTextField>
      <BTextField v-model="initalStock" label="Stok" placeholder="Stok awal"></BTextField>
    </div>
    <div class="tw-flex tw-justify-end tw-gap-5">
      <BButton :disabled="true" variant="outlined" label="Batalkan"></BButton>
      <BButton :is-loading="isLoading" :label="`Simpan ${isEdit ? 'Perubahan  ' : 'Pemasok'}`" @click="submit()"></BButton>
    </div>
  </VForm>
</template>