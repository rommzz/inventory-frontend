<script setup lang="ts">
import BAutoComplete from '@/components/BAutoComplete.vue';
import BButton from '@/components/BButton.vue';
import BIcon from '@/components/BIcon.vue';
import BInputDate from '@/components/BInputDate.vue';
import BInputNumber from '@/components/BInputNumber.vue';
import BStepperWindowItem from '@/components/BStepperWindowItem.vue';
import DInventoryItemPicker from '@/components/dialogs/DInventoryItemPicker.vue';
import { useCustomerStore } from '@/modules/customer/stores';
import { formatIDR } from '@/plugin/helpers';
import type { Customer, InventoryItem, PurchaseItemForm } from '@/utils/apis/models/model';
import type { SalesForm } from '@/utils/apis/models/request/salesCreateRequest';
import moment from 'moment';
import { onMounted, ref } from 'vue';

const customerStore = useCustomerStore()
const dInventoryItem = ref<boolean>(false)
const form = ref()

// const listItem = defineModel<PurchaseItem[]>('item', {default: []})
const listItem = ref<PurchaseItemForm[]>([])
const saleDate = ref<string>(moment().format('yyyy-MM-DD'))
const customer = ref<Customer>()

const emit = defineEmits<{
  (e: 'next', value: SalesForm): void
}>()

const show = ref<boolean>(true)
onMounted(() => {
  getData()
})
const getData = async () => {
  customerStore.getListCustomer().then(r => {
    customerList.value = r.data ?? []
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
      customer: customer.value,
      saleDate: saleDate.value,
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
const customerList = ref<Customer[]>([]);
</script>
<template>
  <BStepperWindowItem title="Data Pembelian">
    <VForm ref="form">
      <div>
        <div class="tw-grid tw-grid-cols-2 tw-gap-5">
          <BAutoComplete
            label="Pelanggan"
            :items="customerList"
            :item-title="v => v.name ?? ''"
            v-model="customer"
            required
						placeholder="Pilih Pelanggan"
            :rules="[ v => !!v || 'Pelanggan Wajib diisi', ]"
          />
          <BInputDate
            label="Tanggal Penjualan"
            :max-date="moment().format('yyyy-MM-DD')"
            v-model="saleDate"
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
            <div class="tw-mr-12 tw-font-semibold tw-text-sm tw-min-w-24">{{ formatIDR(item.qty * item.price, true) }}</div>
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