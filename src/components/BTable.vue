<script setup lang="ts" generic="T extends {}">
import { useSlots } from 'vue';
import BButton from './BButton.vue';
import BIcon from './BIcon.vue';
import BTextField from './BTextField.vue';

defineProps<{
  perPage: 10 | 15 | 20
  totalItems: number
  emptyText?: string
  labelAddButton?: string
}>()

const emit = defineEmits<{
  (event: "click:action"): void;
}>()

const slot = useSlots()

</script>
<template>
  <div class="!tw-bg-onPrimary tw-rounded-xl tw-shadow">
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
      <slot name="action:group" v-if="slot['action:group']"/>
      <template v-else>
        <BButton v-if="labelAddButton" :label="labelAddButton ?? 'Tambah'" prepend-icon="add" @click="emit('click:action')"/>
      </template>
    </div>
		<slot/>
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