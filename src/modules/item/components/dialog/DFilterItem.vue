<script setup lang="ts">
import BAutoComplete from '@/components/BAutoComplete.vue';
import BButton from '@/components/BButton.vue';
import BDialog from '@/components/BDialog.vue';
import BSelect from '@/components/BSelect.vue';
import { useCarStore } from '@/modules/car/stores';
import { useSupplierStore } from '@/modules/supplier/stores';
import { itemTypeList } from '@/plugin/globalVar';
import type { Supplier } from '@/utils/apis/models/model';
import { type InventoryItemFilter } from '@/utils/apis/repo/inventoryItemApi';
import { reactive, ref, watch } from 'vue';

const supplierStore = useSupplierStore()
const carStore = useCarStore()

const dialog = defineModel<boolean>()
const props = defineProps<{
  filter: InventoryItemFilter
}>()
const emit = defineEmits<{
  (e: 'apply', v: InventoryItemFilter): void
}>()

const debounce = ref<any>()

const data = reactive<InventoryItemFilter>({})

const listSupplier = ref<Supplier[]>([])

const getListSupplier = () => {
  supplierStore.getListSupplier().then(r => {
    listSupplier.value = r.data ?? []
  })
}

const onSearchCarType = (search?: string) => {
	clearTimeout(debounce.value);
	debounce.value = setTimeout(() => {
		carStore.carTypeList = []
		carStore.getCarTypeList({search: search})
	}, 500);
}

const apply = (): void => {
  emit('apply', data);
  dialog.value = false
}
const reset = (): void => {
  Object.assign(data, props.filter)
  console.log(data, props.filter);
}

watch(dialog, newV => {
  if (newV) {
    if (!listSupplier.value.length) {
      getListSupplier()
    }
    reset()
  }
})

</script>
<template>
  <BDialog v-model="dialog" title="Filter" width="512">
    <BSelect
			label="Tipe"
			:items="itemTypeList"
			v-model="data.type"
			:item-title="v => v.title"
			clearable
			placeholder="Pilih Tipe Barang"
		/>
    <BAutoComplete
			placeholder="Tipe Mobil"
			clearable
			multiple
			:items="carStore.carTypeList"
			label="Merk"
			:item-title="v => v.name"
			v-model="data.carType"
			:loading="carStore.loading.carTypeList"
			@update:search="onSearchCarType"
		/>
    <BAutoComplete
			placeholder="Pilih Supplier"
			:items="listSupplier"
			label="Pemasok"
			multiple
			:item-title="v => v.name ?? ''"
			v-model="data.supplier"
			clearable
		/>
    <template v-slot:action>
      <BButton label="Reset" variant="outlined" @click="reset()"></BButton>
      <BButton label="Terapkan" @click="apply"></BButton>  
    </template>
  </BDialog>
</template>