<script setup lang="ts">
import BAutoComplete from '@/components/BAutoComplete.vue';
import BButton from '@/components/BButton.vue';
import BSelect from '@/components/BSelect.vue';
import BTextField from '@/components/BTextField.vue';
import { useSupplierStore } from '@/modules/supplier/stores';
import { itemTypeList, type ItemTypeList } from '@/plugin/globalVar';
import { formatIDR } from '@/plugin/helpers';
import router from '@/router';
import { useMetaStore } from "@/stores/meta";
import type { CarCode, Supplier, Unit } from '@/utils/apis/models/model';
import type { InventoryItemForm } from '@/utils/apis/models/request/request';
import { computed, onMounted, ref } from 'vue';
import { useItemStore } from '../stores';
import { useCarStore } from '@/modules/car/stores';

const props = defineProps<{
  id?: string;
}>();

const itemStore = useItemStore();
const metaStore = useMetaStore();
const supplierStore = useSupplierStore();
const carStore = useCarStore()

const listSupplier = ref<Supplier[]>([]);
const listUnit = computed(() => metaStore.units);

const form = ref();
const sku = ref<string>('');
const name = ref<string>('');
const purchasePrice = ref<number>(0);
const initalStock = ref<number>(0);
const selectedItemType = ref<ItemTypeList>();
const selectedSupplier = ref<Supplier>();
const selectedUnit = ref<Unit>();
const carCode = ref<CarCode>()

const unitLoading = ref<boolean>(false);
const supplierLoading = ref<boolean>(false);

const isLoading = ref<boolean>(false);
const isEdit = props.id !== undefined;

const addBrand = async (brandName: string) => {
  await metaStore.addBrand(brandName)
}

const getUnit = async () => {
  if (metaStore.units.length == 0) {
    unitLoading.value = true;
    metaStore.getListUnits().catch(e => {
      console.log(e);
    }).finally(() => {
      unitLoading.value = false;
    });
  }
}
const getSupplier = async () => {
  supplierLoading.value = true;
  listSupplier.value = []
  supplierStore.getListSupplier().then(e => {
    listSupplier.value = e.data ?? []
  })
  .catch(e => {
    console.log(e);
  }).finally(() => {
    supplierLoading.value = false;
  });
}

onMounted(() => {
  getSupplier();
  getUnit();
	carStore.getCarCodeList();
  if (isEdit) {
    itemStore.getItem(props.id).then(r => {
      name.value =  r.name
      initalStock.value =  r.initial_stock
      // selectedItemType.value =  r.brand
      sku.value =  r.sku
      selectedSupplier.value =  r.supplier
      selectedUnit.value =  r.unit
      purchasePrice.value =  r.price
    })
  }
})

const submit = async () => {
  const valid = await form.value.validate()

  if (valid.valid) {
    const form: InventoryItemForm = {
      name: name.value,
      initial_stock: initalStock.value,
      brand_id: 'selectedItemType.value!.id!',
      sku: sku.value,
      supplier_id: selectedSupplier.value!.id!,
      unit_id: selectedUnit.value!.id,
      price: purchasePrice.value
    }
    
    isLoading.value = true;
    isEdit ? updateSupplier(form) : createSupplier(form);
  }
}

const updateSupplier = async (form: InventoryItemForm) => {
  itemStore.editItem(form, props.id!).then(() => {
    router.replace({path: '/data/item'})
  }).catch(e => {
    console.log(e);
  }).finally(() => {
    isLoading.value = false
  })
}

const createSupplier = async (form: InventoryItemForm) => {
  itemStore.addItem(form).then(() => {
    router.replace({path: '/data/item'})
  }).catch(e => {
    console.log(e);
  }).finally(() => {
    isLoading.value = false
  })
}

</script>
<template>
  <VForm class="tw-bg-white tw-rounded-xl tw-p-5 tw-shadow" ref="form" @submit.prevent>
    <div class="tw-grid tw-grid-cols-2 tw-gap-x-5">
      <BTextField required v-model="sku" label="SKU" placeholder="SKU Barang" :rules="[ v => !!v || 'Kolom Wajib diisi', ]" clearable></BTextField>
      <BTextField required v-model="name" label="Nama" placeholder="Nama Barang" :rules="[ v => !!v || 'Kolom Wajib diisi', ]" ></BTextField>
    </div>
    <div class=" tw-grid tw-grid-cols-3 tw-gap-x-5">
			<BSelect :rules="[ v => !!v || 'Kolom Wajib diisi', ]" label="Pemasok" :items="listSupplier" required v-model="selectedSupplier" :item-title="(item) => item.name ?? ''" placeholder="Pemasok Barang" :loading="supplierLoading"/>
			<BAutoComplete
				:rules="[ v => !!v || 'Kolom Wajib diisi', ]"
				label="Tipe"
				:items="itemTypeList"
				required
				v-model="selectedItemType"
				:item-title="(item) => item.title"
				placeholder="Pilih Tipe Barang"
			>
				<template v-slot:no-data="{search}">
					<div @click="addBrand(search)" class="tw-cursor-pointer tw-p-4" >
						tambahkan '{{search}}'
					</div>
				</template>
			</BAutoComplete>
      <BSelect :rules="[ v => !!v || 'Kolom Wajib diisi', ]" label="Satuan" :items="listUnit" :loading="unitLoading" required v-model="selectedUnit" :item-title="(item) => item.name" placeholder="Satuan Barang"/>
    </div>
		<div class=" tw-grid tw-grid-cols-3 tw-gap-x-5">
			<BAutoComplete
				:rules="[ v => !!v || 'Kolom Wajib diisi', ]"
				label="Kode Mobil"
				:items="carStore.carCodeList"
				required
				v-model="carCode"
				:item-title="(item) => item.code"
				placeholder="Pilih Kode Mobil"
			>
				<template v-slot:no-data="{search}">
					<div @click="addBrand(search)" class="tw-cursor-pointer tw-p-4" >
						tambahkan '{{search}}'
					</div>
				</template>
			</BAutoComplete>
			<BAutoComplete
				:rules="[ v => !!v || 'Kolom Wajib diisi', ]"
				label="Tipe"
				:items="itemTypeList"
				required
				v-model="selectedItemType"
				:item-title="(item) => item.title"
				placeholder="Pilih Tipe Barang"
			>
				<template v-slot:no-data="{search}">
					<div @click="addBrand(search)" class="tw-cursor-pointer tw-p-4" >
						tambahkan '{{search}}'
					</div>
				</template>
			</BAutoComplete>
      <BSelect :rules="[ v => !!v || 'Kolom Wajib diisi', ]" label="Satuan" :items="listUnit" :loading="unitLoading" required v-model="selectedUnit" :item-title="(item) => item.name" placeholder="Satuan Barang"/>
    </div>
    <div class="tw-grid tw-grid-cols-2 tw-gap-x-5">
      <BTextField :rules="[ v => !!v || 'Kolom Wajib diisi', ]" type="number" required v-model.number="purchasePrice" label="Harga Beli" placeholder="Harga Beli Barang" :message="purchasePrice ? formatIDR(purchasePrice) : undefined"/>
      <BTextField :rules="[ v => !!v || 'Kolom Wajib diisi', ]" type="number" required v-model.number="initalStock" label="Stok" placeholder="Stok awal"></BTextField>
    </div>
    <div class="tw-flex tw-justify-end tw-gap-5">
      <BButton :disabled="true" variant="outlined" label="Batalkan"></BButton>
      <BButton type="submit" :is-loading="isLoading" :label="`Simpan ${isEdit ? 'Perubahan  ' : 'Pemasok'}`" @click="submit()"></BButton>
    </div>
  </VForm>
</template>