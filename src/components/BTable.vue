<script setup lang="ts" generic="T extends {}">
import { useSlots } from 'vue';
import BTextField from './BTextField.vue';
import BIcon from './BIcon.vue';
import BButton from './BButton.vue';

const slots = useSlots()
defineProps<{
  items: T[]
  perPage: 10 | 15 | 20
  totalItems: number
  emptyText?: string
  showedItem: T[]
  headers: string[]
  labelAddButton?: string
}>()

const emit = defineEmits<{
  (event: "onClickAdd"): void;
}>()

</script>
<template>
  <div class="!tw-bg-onPrimary tw-rounded-xl">
    <div class="tw-flex tw-justify-between tw-p-5 tw-border-b tw-border-outlineVariant tw-bg-onPrimary tw-rounded-t-xl">
      <div class="tw-flex tw-gap-4">
        <VMenu>
          <template v-slot:activator="{ props }">
            <div class="tw-flex tw-items-center tw-gap-1 px-2 tw-border tw-rounded-lg tw-border-outline hover:tw-cursor-pointer" v-bind="props" >
              <span>{{ perPage }}</span>
              <BIcon icon="expand_more" size="16"></BIcon>
            </div>
          </template>
          <v-list>
          <v-list-item
              v-for="item, in [10, 15, 20]"
              :key="item"
              :value="perPage"
            >
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </VMenu>
        <BTextField label="" density="compact" placeholder="cari pemasok" class="tw-min-w-52" hide-details prepend-inner-icon="search"></BTextField>
      </div>
      <BButton v-if="labelAddButton" :label="labelAddButton ?? 'Tambah'" prepend-icon="add" @click="emit('onClickAdd')"/>
    </div>

    <div v-if="!showedItem.length" class="tw-text-center tw-pt-4 tw-pb-6 tw-text-onSurfaceVariant">
      {{ emptyText || 'Tidak ada data' }}
    </div>
    <template v-else>
      <slot v-if="slots['body']" name="body"/>
      <table class="tw-table-auto tw-w-full tw-text-sm tw-text-onSurface" v-else>
          <thead>
            <tr class="tw-text-left !tw-p-4">
              <th v-for="header in headers" :key="header" class="tw-py-4 first:tw-pl-4 last:tw-pr-4 tw-font-semibold">
                {{ header }}
              </th>
            </tr>
            <tr v-for="row, index  in showedItem" :key="index" class="tw-border-t tw-border-outlineVariant">
              <td v-for="item, indexItem in row" :key="indexItem" class="tw-py-4 first:tw-pl-4 last:tw-pr-4">
                {{ item }}
              </td>
            </tr>
          </thead>
        </table>
    </template>
    <div class="tw-flex tw-justify-between tw-items-center tw-pb-6 tw-pt-4 tw-border-t tw-px-5 tw-border-outlineVariant tw-text-sm">
      <span>Menampilkan 1 hingga 10 dari {{ totalItems }} entri</span>
      <VPagination variant="elevated" density="compact" color="primary" :length="13" rounded="circle" total-visible="5">
        <!-- <template v-slot:next>
          <div class="tw-w-8 tw-rounded-full tw-border-surfaceVariant border tw-flex tw-place-items-center tw-h-8">
            <BIcon icon="chevron_right" color="surfaceVariant" class="tw-mx-auto"></BIcon>
          </div>
        </template> -->
      </VPagination>
    </div>
  </div>
</template>
<style scoped>
.v-select :deep(.v-field) {
  border-radius: 8px;
}
</style>