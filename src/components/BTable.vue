<script setup lang="ts" generic="T extends {}">
import { onMounted, ref, useSlots, watch } from 'vue';
import BButton from './BButton.vue';
import BIcon from './BIcon.vue';
import BTextField from './BTextField.vue';
import type { BTableLimit, BTableQuery } from './types/BTable';

const page = ref<number>(1)

const props = defineProps<{
  query: BTableQuery
  search?: string
  totalItems: number
  emptyText?: string
  labelAddButton?: string
  displayedTotal?: number
}>()

let debounce = ref<number>();

watch(page, (newPage) => {
  let newQuery = props.query
  newQuery.offset = props.query.limit * (newPage - 1),
  emit('change:query', newQuery)
})

const changeLimit = (limit: BTableLimit) => {
  let newQuery = props.query
  newQuery.limit = limit
  emit('change:query', newQuery)
}
const emit = defineEmits<{
  (event: "click:action"): void;
  (event: "change:query", value: BTableQuery): void;
}>()
const paginataionLength = (): number => {
  const length: number = Math.floor(props.totalItems/props.query.limit)
  return length < 1 ? 1 : length
}
const onSearch = (v: any) => {
  clearTimeout(debounce.value);
  debounce.value = setTimeout(() => {
    let newQuery = props.query
    newQuery.search = v
    emit('change:query', newQuery)
  }, 500);
}
onMounted(() => {
  console.log(props.query);
  
})
const slot = useSlots()

</script>
<template>
  <div class="!tw-bg-onPrimary tw-rounded-xl tw-shadow">
    <div class="tw-flex tw-justify-between tw-p-5 tw-border-b tw-border-outlineVariant tw-bg-onPrimary tw-rounded-t-xl">
      <div class="tw-flex tw-gap-4">
        <VMenu>
          <template v-slot:activator="{ props }">
            <div class="tw-flex tw-items-center tw-gap-1 px-2 tw-border tw-rounded-lg tw-border-outline hover:tw-cursor-pointer" v-bind="props" >
              <span>{{ query.limit }}</span>
              <BIcon icon="expand_more" size="16"></BIcon>
            </div>
          </template>
          <v-list>
          <v-list-item
              v-for="item, in [10, 15, 20]"
              :key="item"
              :value="query.limit"
            >
              <v-list-item-title @click="changeLimit(item as 10 | 15 | 20)">{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </VMenu>
        <BTextField
          label=""
          density="compact"
          placeholder="cari pemasok"
          class="tw-min-w-52"
          hide-details prepend-inner-icon="search"
          :model-value="props.query.search"
          @update:model-value="onSearch"
        />
      </div>
      <slot name="action:group" v-if="slot['action:group']"/>
      <template v-else>
        <BButton v-if="labelAddButton" :label="labelAddButton ?? 'Tambah'" prepend-icon="add" @click="emit('click:action')"/>
      </template>
    </div>
		<div v-if="totalItems == 0" class="tw-text-center tw-pt-4 tw-pb-6 tw-text-onSurfaceVariant">
      {{ emptyText || 'Tidak ada data' }}
    </div>
    <slot v-else/>
    <div class="tw-flex tw-justify-between tw-items-center tw-pb-6 tw-pt-4 tw-border-t tw-px-5 tw-border-outlineVariant tw-text-sm">
      <span>Menampilkan 1 hingga {{ displayedTotal }} dari {{ totalItems }} entri</span>
      <VPagination
        variant="elevated"
        density="compact"
        color="primary"
        :length="paginataionLength()"
        rounded="circle"
        total-visible="5"
        v-model="page"
      >
        <template v-slot:item="{page: itemPage, isActive}">
          <div
            @click="itemPage != '...' && (page = parseInt(itemPage))"
            :class="`hover:tw-cursor-pointer tw-h-8 tw-w-8 tw-flex tw-place-items-center tw-justify-center tw-rounded-full tw-border-outlineVariant ${isActive ? 'tw-text-white tw-bg-primary': 'tw-border tw-text-onSurfaceVariant'} `"
          >
            {{ itemPage }}
          </div>
        </template>
        <template v-slot:next="{onClick}">
          <div @click="onClick" class="hover:tw-cursor-pointer tw-w-8 tw-rounded-full tw-border-onSurfaceVariant tw-border tw-flex tw-place-items-center tw-h-8">
            <BIcon icon="chevron_right" color="onSurfaceVariant" class="tw-mx-auto"></BIcon>
          </div>
        </template>
        <template v-slot:prev="{onClick}">
          <div @click="onClick" class="hover:tw-cursor-pointer tw-w-8 tw-rounded-full tw-border-onSurfaceVariant tw-border tw-flex tw-place-items-center tw-h-8">
            <BIcon icon="chevron_left" color="onSurfaceVariant" class="tw-mx-auto"></BIcon>
          </div>
        </template>
      </VPagination>
    </div>
  </div>
</template>
<style scoped>
.v-select :deep(.v-field) {
  border-radius: 8px;
}
</style>