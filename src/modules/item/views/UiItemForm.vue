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
import type { CarCode, CarGroupType, CarType, Supplier, Unit } from '@/utils/apis/models/model';
import type { InventoryItemForm } from '@/utils/apis/models/request/request';
import { computed, onMounted, ref } from 'vue';
import { useItemStore } from '../stores';
import { useCarStore } from '@/modules/car/stores';
import BInputDate from '@/components/BInputDate.vue';
import moment from 'moment';
import { reactive } from 'vue';

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
const validFrom = ref<string>(moment().format('yyyy-MM-DD'))
const taxRecomendation = ref<number>()
const mGroup = ref<string>()
const productHierarchy = ref<string>()

const unitLoading = ref<boolean>(false);
const supplierLoading = ref<boolean>(false);
const carGroupTypeLoading = ref<boolean>(false);
const carTypeLoading = ref<boolean>(false);
const carCodeLoading = ref<boolean>(false);

const carGroupType = ref<CarGroupType>()
const carType = ref<CarType>()
const carCode = ref<CarCode>()

let debounce = reactive<{
	carGroup: any,
	carType: any,
	carCode: any,
}>({
	carGroup: undefined,
	carType: undefined,
	carCode: undefined,
});

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

const getCarTypeGroupList = (search?: string) => {
	clearTimeout(debounce.carGroup);
  debounce.carGroup = setTimeout(() => {
    carGroupTypeLoading.value = true
		carStore.getCarTypeGroupList(search).then(() => {
			
		})
		.catch(e => {
			console.log(e);
		}).finally(() => {
			carGroupTypeLoading.value = false
		})
  }, 500);
}

const getCarTypeList = (groupId?: string) => {
	clearTimeout(debounce.carType);
  debounce.carType = setTimeout(() => {
    carTypeLoading.value = true
		carStore.getCarTypeList(groupId).catch(e => {
			console.log(e);
		}).finally(() => {
			carTypeLoading.value = false
		})
  }, 500);
}

const getCarCodeList = (carType?: string) => {
	clearTimeout(debounce.carCode);
  debounce.carCode = setTimeout(() => {
    carCodeLoading.value = true
		carStore.getCarCodeList(carType).catch(e => {
			console.log(e);
		}).finally(() => {
			carCodeLoading.value = false
		})
  }, 500);
}

onMounted(() => {
  getSupplier();
  getUnit();
  if (isEdit) {
    itemStore.getItem(props.id).then(r => {
      name.value =  r.name
      initalStock.value =  r.initial_stock
      selectedItemType.value = itemTypeList.find(v => v.value == r.type)
      sku.value =  r.sku
      selectedSupplier.value =  r.supplier
      selectedUnit.value =  r.unit
      purchasePrice.value =  r.price
			carGroupType.value = r.car_code.car_type.car_group_type
			carType.value = r.car_code.car_type
			carCode.value = r.car_code
			taxRecomendation.value = r.tax_recommendation
			mGroup.value = r.m_group
			productHierarchy.value = r.product_hierarchy
    })
  }
})

const submit = async () => {
  const valid = await form.value.validate()
  if (valid.valid) {
    const form: InventoryItemForm = {
      name: name.value,
      initial_stock: initalStock.value,
      sku: sku.value,
      supplier_id: selectedSupplier.value!.id!,
      unit_id: selectedUnit.value!.id,
      price: purchasePrice.value,
			car_code_id: carCode.value?.id!,
			type: selectedItemType.value?.value!,
			valid_from: moment(validFrom.value + ' ' + moment().utc().format('HH:mm:ss')).utc().format(),
			m_group: mGroup.value,
			tax_recommendation: taxRecomendation.value,
			product_hierarchy: productHierarchy.value,
    }
    
    isLoading.value = true;
    isEdit ? updateItem(form) : createItem(form);
  }
}

const updateItem = async (form: InventoryItemForm) => {
  itemStore.editItem(form, props.id!).then(() => {
    router.replace({path: '/data/item'})
  }).catch(e => {
    console.log(e);
  }).finally(() => {
    isLoading.value = false
  })
}

const createItem = async (form: InventoryItemForm) => {
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
				v-model="carGroupType"
				@update:search="getCarTypeGroupList"
				:rules="[ v => !!v || 'Kolom Wajib diisi', ]"
				label="Grup Tipe Mobil"
				:items="carStore.carTypeGroupList"
				required
				:item-title="(item) => item.name"
				placeholder="Pilih Grup Tipe Mobil"
				:loading="carGroupTypeLoading"
				@update:model-value="(v) => {
					carStore.carTypeList = []
					carStore.carCodeList = []
					carType = undefined
					carCode = undefined
					getCarTypeList(carGroupType?.id)
				}"
			/>
			<BAutoComplete
				@update:search="getCarTypeList"
				:rules="[ v => !!v || 'Kolom Wajib diisi', ]"
				label="Tipe Mobil"
				:items="carStore.carTypeList"
				required
				:loading="carTypeLoading"
				v-model="carType"
				@update:model-value="v => {
					carStore.carCodeList = []
					carCode = undefined
					getCarCodeList(carType?.id)
				}"
				:item-title="(item) => item.name"
				placeholder="Pilih Tipe Mobil"
			/>
      <BAutoComplete
				:rules="[ v => !!v || 'Kolom Wajib diisi', ]"
				label="Kode Mobil"
				:items="carStore.carCodeList"
				required
				v-model="carCode"
				:item-title="(item) => item.code"
				placeholder="Pilih Kode Mobil"
			/>
    </div>
    <div class="tw-grid tw-grid-cols-2 tw-gap-x-5">
      <BInputDate
				label="Berlaku Dari"
				v-model="validFrom"
			/>
      <BTextField :rules="[ v => !!v || 'Kolom Wajib diisi', ]" type="number" required v-model.number="initalStock" label="Stok" placeholder="Stok awal"></BTextField>
    </div>
		<div class="tw-grid tw-grid-cols-2 tw-gap-x-5">
      <BTextField
				:rules="[ v => !!v || 'Kolom Wajib diisi', ]"
				type="number"
				required
				v-model.number="purchasePrice"
				label="Harga"
				placeholder="Harga Barang"
				:message="purchasePrice ? formatIDR(purchasePrice) : undefined"
			/>
      <BTextField
				label="Rekomendasi Pajak"
				type="number"
				placeholder="ex: 11"
				v-model.number="taxRecomendation" 
				@update:model-value="v => {
					taxRecomendation = v > 100 ? 100 : v
				}"
				append-inner-icon="percent"
			/>
    </div>
		<div class="tw-grid tw-grid-cols-2 tw-gap-x-5">
      <BTextField
				v-model="mGroup"
				label="M Group"
				placeholder="M Group Barang"
			/>
      <BTextField
				v-model="productHierarchy"
				label="Product Hierarchy"
				placeholder="Product Hierarchy Barang"
			/>
    </div>
    <div class="tw-flex tw-justify-end tw-gap-5">
      <BButton :disabled="true" variant="outlined" label="Batalkan"></BButton>
      <BButton type="submit" :is-loading="isLoading" :label="`Simpan ${isEdit ? 'Perubahan  ' : 'Barang'}`" @click="submit()"></BButton>
    </div>
  </VForm>
</template>