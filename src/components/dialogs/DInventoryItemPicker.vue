<script setup lang="ts">
import { ref, watch } from 'vue';
import BDialog from '../BDialog.vue';
import BTextField from '../BTextField.vue';
import type { InventoryItem } from '@/utils/apis/models/model';
import { useItemStore } from '@/modules/item/stores';
import { formatIDR } from '@/plugin/helpers';

const inventoryItemStore = useItemStore()

const dialog = defineModel<boolean>();
const listInventoryitem = ref<InventoryItem[]>([])
const loadStatus = ref<'initial' | 'loadMore' | 'done'>('initial')

const getInventoryItem = async () => {
  inventoryItemStore.getListItem().then(r => {
    listInventoryitem.value = r.data
    loadStatus.value = listInventoryitem.value.length < (r.meta?.count ?? 0) ? 'loadMore' : 'done'
  }).catch(e => {
    console.log(e);
  })
}

const emit = defineEmits<{
  (event: "select", value: InventoryItem): void;
}>()

watch(dialog, newV => {
  if (newV) {
    loadStatus.value = 'initial'
    listInventoryitem.value = []
    getInventoryItem()
  }
})
</script>
<template>
  <BDialog v-model="dialog" title="Tambah Barang" :width="512">
    <div class="">
      <BTextField label="" placeholder="Cari Barang" prepend-inner-icon="search"></BTextField>
      <div class="tw-overflow-auto tw-max-h-96">
        <div
          v-for="item in listInventoryitem"
          :key="item.id"
          class="tw-rounded-xl tw-border tw-border-outlineVariant tw-flex tw-justify-between tw-items-center tw-bg-surface tw-p-3 tw-mt-4 tw-font-semibold tw-text-sm tw-cursor-pointer"
          @click="emit('select', item)"
        >
          <div>
            <div class="tw-text-onSurface tw-mb-1">{{ item.name }} - {{ item.brand.name }}</div>
            <div class="tw-text-onSurfaceVariant tw-font-normal tw-text-xs">Sisa Stok: {{ item.stock.qty }} {{ item.unit.name }}</div>
          </div>
          <div>{{ formatIDR(item.price, true) }}</div>
        </div>
      </div>
    </div>
  </BDialog>
</template>