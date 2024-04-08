<script setup lang="ts">
import BIcon from '@/components/BIcon.vue';
import BOverlay from '@/components/BOverlay.vue';
import BSelect from '@/components/BSelect.vue';
import BTable from '@/components/BTable.vue';
import type { BIconName } from '@/components/types/BIcon';
import { useCustomerStore } from '@/modules/customer/stores';
import { useItemStore } from '@/modules/item/stores';
import { useSaleStore } from '@/modules/sale/stores';
import { formatIDR } from '@/plugin/helpers';
import { pallete } from '@/plugin/palette';
import { useMetaStore } from '@/stores/meta';
import type { ChartModel, Payment, Sales } from '@/utils/apis/models/model';
import { Chart, type ChartItem } from 'chart.js/auto';
import moment from 'moment';
import { computed, onMounted, reactive, ref } from 'vue';

type Period = {
	title: string,
	value: string,
}

const listPeriod: Period[] = [
	{
		title: 'Tahun ini',
		value: 'year'
	},
	{
		title: 'Bulan ini',
		value: 'month'
	},
	{
		title: 'Hari ini',
		value: 'day'
	}
]

const loading = reactive<{
	chart: boolean
	sale: boolean
}>({
	chart: false,
	sale: false,
})

const customerStore = useCustomerStore()
const inventoryItemStore = useItemStore()
const metaStore = useMetaStore()
const purchaseStore = useSaleStore()

const countCustomer = ref<number>(0)
const itemCount = ref<number>(0)
const todaySales = ref<number>(0)
const chartData = ref<ChartModel[]>([])
const selectedListPeriod = ref<Period>(listPeriod[1])
const sales = ref<Sales[]>([])

const getSale = async () => {
	loading.sale = true;
	purchaseStore.getListSales({
		limit: 5,
		offset: 0
	}).then((res) => {
		console.log(res);
		sales.value = res.data ?? [];
	}).catch((err) => {
		console.error(err);
	}).finally(() => {
		loading.sale = false;
	});
}

const initChart = () => {
	let ctx = document.getElementById('chart');

	new Chart(ctx as ChartItem, {
		type: 'line',
		data: {
			labels: chartData.value.map(v => v.title),
			datasets: [{
				label: '',
				data: chartData.value.map(v => v.value),
				borderWidth: 3,
				borderColor: pallete.schemes.light.primary,
				fill: 20,
				tension: 0.3,
				pointRadius: 2,
				pointHoverRadius: 4
				
			}],
		},
		options: {
			color: pallete.schemes.light.primary,
			// scales: {
			// 	y: {
			// 		beginAtZero: true
			// 	}
			// }
		}
	});
}
const remeaningPayment = (payment: Payment[], grandTotal: number): number => {
	if (!payment.length) {
		return grandTotal
	} else {
		return payment[payment.length - 1].remaining_payment
	}
} 

const getSalesChart = () => {
	loading.chart = true
	metaStore.getSalesChart(selectedListPeriod.value.value).then(r => {
		chartData.value = r
		initChart()
	}).finally(() => loading.chart = false)
}

onMounted(() => {
	getSale()
	customerStore.getCountCustomer().then(r => countCustomer.value = r)
	inventoryItemStore.countInventoryItem().then(r => itemCount.value = r)
	metaStore.getTodaySales().then(r => todaySales.value = r)
	getSalesChart()
})

const summary = computed<{
	title: string
	icon: BIconName
	value: any
	iconBgColor: keyof typeof pallete.schemes.light
}[]>(() => [{
		 title: 'Penjualan Hari Ini',
		 icon: 'universal_currency_alt',
		 iconBgColor: 'primary',
		 value: formatIDR(todaySales.value),
	},
	{
		 title: 'Jumlah Barang',
		 icon: 'inventory_2',
		 iconBgColor: 'secondary',
		 value: itemCount.value
	},
	{
		 title: 'Jumlah Pelanggan',
		 icon: 'person',
		 iconBgColor: 'success',
		 value: countCustomer,
	}])
</script>
<template>
	<div class="tw-pb-10">
		<div class="tw-grid tw-grid-cols-3 tw-gap-5">
			<div
				class="tw-shadow-md tw-rounded-2xl tw-flex tw-bg-white tw-justify-between tw-items-center tw-py-8 tw-px-5"
				v-for="item, index in summary" :key="index"
			>
				<div>
					<div class="tw-text-sm tw-font-semibold tw-text-onSurfaceVariant">
						{{ item.title }}
					</div>
					<div class="tw-text-onSurface tw-text-3xl tw-font-bold">
						{{ item.value }}
					</div>
				</div>
				<div
					class="tw-w-12 tw-h-12 tw-rounded-full tw-flex"
					:style="`background: ${pallete.schemes.light[item.iconBgColor]}`"
				>
					<BIcon class="tw-self-center tw-mx-auto" :icon="item.icon" color="white"></BIcon>
				</div>
			</div>
		</div>
		<div class="tw-bg-white tw-rounded-xl tw-mt-8 tw-relative tw-shadow-md">
			<BOverlay v-model="loading.chart" />
			<div class="tw-flex tw-justify-between tw-items-center tw-py-4 tw-px-5">
				<h5 class="tw-font-semibold tw-text-xl">
					Grafik Penjualan
				</h5>
				<BSelect
					label="Periode"
					:items="listPeriod"
					:item-title="v => v.title"
					v-model="selectedListPeriod"
					@update:model-value="getSalesChart()"
				/>
			</div>
			<VDivider></VDivider>
			<canvas class="tw-pb-3 px-3" id="chart"></canvas>
		</div>
		<BTable
			:query="{
				limit: 15,
				offset: 0
			}"
      :total-items="sales.length"
			:loading="loading.sale"
			hide-footer
			class="tw-mt-8"
    >
			<template v-slot:header>
				<div>
					<div class="tw-font-semibold tw-text-xl tw-p-5">
						Penjualan Terakhir
					</div>
					<VDivider/>
				</div>
			</template>
			<table class="tw-table-auto tw-w-full tw-text-sm tw-text-onSurface">
				<thead>
					<tr class="tw-text-left !tw-p-4">
						<th
							v-for="header in [ 'ID', 'Nama Pelanggan', 'Nama Barang', 'Grand Total', 'Sisa Bayar', 'Status Lunas', 'Tanggal Penjualan']"
							:key="header"
							class="tw-py-4 first:tw-pl-4 last:tw-pr-4 tw-font-semibold"
						>
							{{ header }}
						</th>
					</tr>
					<tr
						v-for="sale, index in sales"
						:key="index"
						class="tw-border-t tw-border-outlineVariant tw-group tw-cursor-pointer"
					>
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4 tw-gap-2">
							{{ sale.id }}
						</td>
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4">
							{{ sale.customer.name }}
						</td>
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4">
							<div>
								<div>
									{{ sale.items[0].inventory_item.name ?? '-' }}
								</div>
								<span v-if="sale.items.length > 1" class="tw-text-sm tw-text-outline">
									+ {{ sale.items.length - 1 }} barang lainnya
								</span>
							</div>
							<v-tooltip
								v-if="sale.items.length > 1"
								activator="parent"
								location="right"
							>
								<p v-for="item in sale.items" :key="item.id">
									{{ item.inventory_item.name }}
								</p>
							</v-tooltip>
						</td>
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4">
							{{ formatIDR(sale.grand_total) }}
						</td>
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4">
							{{ formatIDR(sale.paid == 1 ? 0 : remeaningPayment(sale.payments ?? [], sale.grand_total)) }}
						</td>
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4">
							{{ sale.paid ? 'Lunas' : sale.payments?.length ? 'Belum Lunas' : 'Belum Bayar' }}
						</td>
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4">
							{{ moment(sale.sale_date).format('DD MMM yyy') }}
						</td>
					</tr>
				</thead>
			</table>
    </BTable>
	</div>
</template>