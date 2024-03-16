<script setup lang="ts">
import BAutoComplete from '@/components/BAutoComplete.vue';
import BButton from '@/components/BButton.vue';
import BDialog from '@/components/BDialog.vue';
import BInputDate from '@/components/BInputDate.vue';
import { useSupplierStore } from '@/modules/supplier/stores';
import { useMetaStore } from '@/stores/meta';
import type { Supplier } from '@/utils/apis/models/model';
import { type InventoryItemFilter } from '@/utils/apis/repo/inventoryItemApi';
import moment from 'moment';
import { reactive, ref, watch } from 'vue';
const metaStore = useMetaStore()
const supplierStore = useSupplierStore()

const dialog = defineModel<boolean>()
const props = defineProps<{
  filter: InventoryItemFilter
}>()
const emit = defineEmits<{
  (e: 'apply', v: InventoryItemFilter): void
}>()

const data = reactive<InventoryItemFilter>({})

const listSupplier = ref<Supplier[]>([])

const getListSupplier = () => {
  supplierStore.getListSupplier().then(r => {
    listSupplier.value = r.data ?? []
  })
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
    if (!metaStore.brand.length) {
      metaStore.getListBrand();
    }
    if (!listSupplier.value.length) {
      getListSupplier()
    }
    reset()
  }
})

</script>
<template>
  <BDialog v-model="dialog" title="Filter" width="512">
    <VRow>
      <VCol>
        <BInputDate label="Tanggal Awal" v-model="data.startDate" :max-date="moment().format('yyyy-MM-DD')"></BInputDate>
      </VCol>
      <VCol>
        <BInputDate label="Tanggal Akhir" v-model="data.endDate" :max-date="moment().format('yyyy-MM-DD')"></BInputDate>
      </VCol>
    </VRow>
    <BAutoComplete placeholder="Pilih Merk" multiple :items="metaStore.brand" label="Merk" :item-title="v => v.name" v-model="data.brand"></BAutoComplete>
    <BAutoComplete placeholder="Pilih Supplier" :items="listSupplier" label="Pemasok" :item-title="v => v.name ?? ''" v-model="data.supplier"></BAutoComplete>
    <template v-slot:action>
      <BButton label="Reset" variant="outlined" @click="reset()"></BButton>
      <BButton label="Terapkan" @click="apply"></BButton>  
    </template>
  </BDialog>
</template>