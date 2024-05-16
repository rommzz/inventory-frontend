<script setup lang="ts">
import BTable from '@/components/BTable.vue';
import type { BTableQuery } from '@/components/types/BTable';
import { useMetaStore } from '@/stores/meta';
import { onMounted, reactive } from 'vue';

const metaStore = useMetaStore()

let query = reactive<BTableQuery>({
	limit: 10,
	offset: 0,
})

const getListUnit = async () => {
	if (!metaStore.units.length) {
		metaStore.getListUnits()
	}
}

onMounted(() => {
  getListUnit()
})
</script>
<template>
  <div>
    <BTable
			:query="query"
      :total-items="metaStore.units.length ?? 0"
      label-add-button="Pelanggan Baru"
			:displayed-total="metaStore.units.length"
			hide-header
    >
			<table class="tw-table-auto tw-w-full tw-text-sm tw-text-onSurface">
				<thead>
					<tr class="tw-text-left !tw-p-4">
						<th
							v-for="header in ['ID', 'Read Id', 'Nama']"
							:key="header"
							class="tw-py-4 first:tw-pl-4 last:tw-pr-4 tw-font-semibold"
						>
							{{ header }}
						</th>
					</tr>
					<tr
						v-for="unit, index in metaStore.units"
						:key="index"
						class="tw-border-t tw-border-outlineVariant tw-group hover:tw-bg-surface"
					>
						<td class="tw-py-4 tw-pl-4 ">
							{{ unit.id }}
						</td>
						<td class="tw-py-4">
							{{ unit.name == '' ? '-' : unit.name }}
						</td>
						<td class="tw-py-4">
							{{ unit.name == '' ? '-' : unit.name }}
						</td>
					</tr>
				</thead>
			</table>
    </BTable>
  </div>
</template>
