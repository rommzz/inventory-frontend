<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BDialog from '@/components/BDialog.vue';
import BInputDate from '@/components/BInputDate.vue';
import { paymentStatusList } from '@/utils/apis/models/commons';
import type { SalesFilter } from '@/utils/apis/repo/salesApi';
import { reactive, watch } from 'vue';

const dialog = defineModel<boolean>()

const props = defineProps<{
	filter: SalesFilter
}>()

let filterData = reactive<SalesFilter>({})

watch(dialog, newV => {
	if (newV) {
		filterData = props.filter
	}
})

const emit = defineEmits<{
	(e: 'onApply', value: SalesFilter): void
}>()

</script>
<template>
	<BDialog
		v-model="dialog"
		title="Filter"
		width="512px"
	>
		<div>
			<span>Periode Penjualan</span>
			<div class="tw-grid tw-grid-cols-2 tw-gap-2">
				<BInputDate
					label=""
					placeholder="Awal"
					v-model="filterData.startDate"
				/>
				<BInputDate
					label=""
					placeholder="Akhir"
					v-model="filterData.endDate"
				/>
			</div>
			<div class="tw-flex tw-gap-4 tw-text-sm tw-font-semibold">
				<button
					v-for="item in paymentStatusList" :key="item.value"
					class="tw-cursor-pointer tw-text-onSurfaceVariant tw-outline tw-outline-1 tw-outline-onSurfaceVariant tw-rounded-lg  tw-px-4 tw-py-2"
					:class="{'tw-bg-primary tw-outline-primary tw-text-white': filterData.saleStatus?.value == item.value}"
					@click="() => {
						filterData.saleStatus = filterData.saleStatus?.value == item.value ? undefined : item
					}"
				>
					{{ item.label }}
				</button>
			</div>
		</div>
		<template v-slot:action>
			<BButton label="Reset" variant="outlined" @click="() => {
				filterData = {}
				emit('onApply', filterData)
			}"></BButton>
			<BButton label="Terapkan" @click="emit('onApply', filterData)"></BButton>
		</template>
	</BDialog>
</template>