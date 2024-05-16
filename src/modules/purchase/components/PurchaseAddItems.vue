<script setup lang="ts">
import BAutoComplete from '@/components/BAutoComplete.vue';
import BButton from '@/components/BButton.vue';
import BIcon from '@/components/BIcon.vue';
import BInputDate from '@/components/BInputDate.vue';
import BInputNumber from '@/components/BInputNumber.vue';
import BStepperWindowItem from '@/components/BStepperWindowItem.vue';
import DInventoryItemPicker from '@/components/dialogs/DInventoryItemPicker.vue';
import { useSupplierStore } from '@/modules/supplier/stores';
import { formatIDR } from '@/plugin/helpers';
import type { InventoryItem, PurchaseItemForm, Supplier } from '@/utils/apis/models/model';
import type { PurchaseForm } from '@/utils/apis/models/request/purchaseAddRequest';
import moment from 'moment';
import { onMounted, ref } from 'vue';

const supplierStore = useSupplierStore()
const dInventoryItem = ref<boolean>(false)
const form = ref()

// const listItem = defineModel<PurchaseItem[]>('item', {default: []})
const listItem = ref<PurchaseItemForm[]>([])
const purchaseDate = ref<string>(moment().format('yyyy-MM-DD'))
const supplier = ref<Supplier>()

const emit = defineEmits<{
  (e: 'next', value: PurchaseForm): void
}>()

const show = ref<boolean>(true)
onMounted(() => {
  getData()
})
const getData = async () => {
  supplierStore.getListSupplier().then(r => {
    supplierList.value = r.data ?? []
  }).catch(e => {
    console.log(e);
  }).finally(() => {
    console.log('ok');
  })
}
const validate =async () => {
  const valid = await form.value.validate()
  if (!listItem.value.length) {
    console.log('barang masih kosong');
  }
  if (valid.valid && listItem.value.length) {
    emit('next', {
      items: listItem.value,
      supplier: supplier.value,
      purchase_date: purchaseDate.value,
    });
  }
}
const onSelect = (item: InventoryItem) => {
  const listedItem = listItem?.value?.find(e => e.item.id == item.id) 
  if (listedItem) {
    listedItem.qty++
  } else {
    listItem.value?.push({
      item: item,
      qty: 1,
      price: item.price
    })
  }
  show.value = false
  show.value = true
  dInventoryItem.value = false
}
const supplierList = ref<Supplier[]>([]);
</script>
<template>
  <BStepperWindowItem title="Data Pembelian">
    <VForm ref="form">
      <div>
        <div class="tw-grid tw-grid-cols-2 tw-gap-5">
          <BAutoComplete
            label="Pemasok"
            :items="supplierList"
            :item-title="v => v.name ?? ''"
            v-model="supplier"
            required
            :rules="[ v => !!v || 'supplier Wajib diisi', ]"
          />
          <BInputDate
            label="Tanggal Pembelian"
            :max-date="moment().format('yyyy-MM-DD')"
            v-model="purchaseDate"
            required
            :rules="[ v => !!v || 'tanggal Wajib diisi', ]"
          />
        </div>
      </div>
      <div>
        <h5 class="tw-font-semibold">Daftar barang</h5>
        <span
          v-ripple
          class="tw-text-primary tw-flex tw-items-center tw-gap-2 tw-mt-4 tw-max-w-fit tw-p-2 tw-cursor-pointer"
          @click="dInventoryItem = true"
        >
          <BIcon icon="add" color="primary"></BIcon>
          <span>Barang</span>
        </span>
        <div>
          <div
            v-for="item, index in listItem"
            :key="item.item.id"
            class="tw-rounded-xl tw-border tw-border-outlineVariant tw-flex tw-items-center tw-bg-surface tw-p-3 tw-mt-4 "
          >
            <div>
              <div class="tw-text-onSurface tw-mb-1">{{ item.item.name }}</div>
              <div class="tw-text-onSurfaceVariant tw-font-normal tw-text-xs">Sisa Stok: {{ item.item.stock.stock }} {{ item.item.unit.name }}</div>
              <div class="tw-text-onSurfaceVariant tw-font-normal tw-text-xs">Harga Barang: {{ formatIDR(item.item.price, true) }}</div>
            </div>
            <VSpacer/>
            <BInputNumber label="Jumlah" v-model.number="item.qty" class="tw-mr-4"></BInputNumber>
            <BInputNumber label="Harga" v-model.number="item.price" hide-button class="tw-mr-14"></BInputNumber>
            <div class="tw-mr-12 tw-font-semibold tw-text-sm">{{ formatIDR(item.qty * item.price, true) }}</div>
						<BIcon
							icon="delete"
							button-color="errorContainer"
							@click="listItem.splice(index, 1)"
							color="error"
						/>
          </div>
        </div>
      </div>
    </VForm>
  </BStepperWindowItem>
  <div class="tw-flex tw-justify-between">
    <BButton
      disabled
      variant="outlined"
      label="Sebelumnya"
    />
    <BButton
      label="Selanjutnya"
      @click="validate"
    />
  </div>
  <DInventoryItemPicker
    v-model="dInventoryItem"
    @select="onSelect"
  />
</template>