<script setup lang="ts">
import BIcon from '@/components/BIcon.vue';
import BTable from '@/components/BTable.vue';
import DPayment from '@/components/dialogs/DPayment.vue';
import type { BTableQuery } from '@/components/types/BTable';
import { formatIDR } from '@/plugin/helpers';
import type { MetaData } from '@/utils/apis/http';
import type { PaymentMethod } from '@/utils/apis/models/commons';
import type { Payment, Sales } from '@/utils/apis/models/model';
import type { InventoryItemFilter } from '@/utils/apis/repo/inventoryItemApi';
import moment from 'moment';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import DDeleteConfirmation from '../components/dialog/DDeleteConfirmation.vue';
import { useSaleStore } from '../stores';
import type { SalesFilter } from '@/utils/apis/repo/salesApi';
import DSaleFilter from '../components/dialog/DSaleFilter.vue';

const router = useRouter();
const store = useSaleStore();

let query = reactive<BTableQuery>({
	limit: 10,
	offset: 0,
})

let filter = reactive<SalesFilter>({})
const saleData = ref<Sales[]>([]);
const isLoading = ref<boolean>(false);
const isLoadingPay = ref<boolean>(false);
const metaData = ref<MetaData>({});

const deleteDialog = ref<boolean>(false)
const dialogPayment = ref<boolean>(false)
const deleteDialogData = ref<Sales | null>(null)
const filterDialog = ref<boolean>(false)

const onDelete = (sale: Sales) => {
	deleteDialogData.value = sale;
	deleteDialog.value = true;
}

const getData = async () => {
	isLoading.value = true;
	store.getListSales(query, filter).then((res) => {
		saleData.value = res.data ?? [];
		metaData.value = res.meta ?? {};
	}).catch((err) => {
		console.error(err);
	}).finally(() => {
		setTimeout(() => {
			isLoading.value = false;
		}, 500);
	});
}

let saleTempData: Sales

const onPay = async ({paymentMethod, paymentDate,}: {
	paymentMethod: PaymentMethod,
	paymentDate: string,
}) => {
	isLoadingPay.value = true
	store.payment(saleTempData.id, {
		amount: remeaningPayment(saleTempData.payments ?? [], saleTempData.grand_total),
		payment_date: moment(paymentDate).utc().format(),
		payment_method: paymentMethod,
	}).then(() => {
		getData()
	}).catch(e => {
		console.log(e);
	}).finally(() => {
		dialogPayment.value = false
		isLoading.value = false
	})
}

const remeaningPayment = (payment: Payment[], grandTotal: number): number => {
	if (!payment.length) {
		return grandTotal
	} else {
		return payment[payment.length - 1].remaining_payment
	}
} 

const onChangeQuery = (q: BTableQuery) => {
	Object.assign(query, q)
	router.push({path: '/sale', query})
	getData()
}

onMounted(() => {
  getData();
	const {limit, offset} = router.currentRoute.value.query
	Object.assign(query, {limit: limit ?? 10, offset: offset ?? 0})
	console.log(query);
})
</script>
<template>
  <div>
    <BTable
			:query="query"
      :total-items="metaData.count ?? 0"
			search-placeholder="Cari Pembelian"
      label-add-button="Penjualan Baru"
			:displayed-total="saleData.length"
      @click:action="router.push('/sale/add')"
			@change:query="v => onChangeQuery(v)"
			@click:filter="() => {
				filterDialog = true
			}"
			filter
			:loading="isLoading"
    >
			<table class="tw-table-auto tw-w-full tw-text-sm tw-text-onSurface">
				<thead>
					<tr class="tw-text-left !tw-p-4">
						<th
							v-for="header in [ 'ID', 'Nama Pelanggan', 'Nama Barang', 'Grand Total', 'Sisa Bayar', 'Status Lunas', 'Tanggal Penjualan', 'Aksi',]"
							:key="header"
							class="tw-py-4 first:tw-pl-4 last:tw-pr-4 tw-font-semibold"
						>
							{{ header }}
						</th>
					</tr>
					<tr
						v-for="sale, index in saleData"
						:key="index"
						class="tw-border-t tw-border-outlineVariant tw-group tw-cursor-pointer"
						@click="router.push('/sale/' + sale.id)"
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
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4 [&>*]:hover:tw-cursor-pointer">
							<BIcon @click.stop="onDelete(sale)" icon="delete" color="error" class="tw-mr-2" button-color="errorContainer"></BIcon>
							<BIcon
								icon="payments"
								:color="sale.paid ? 'outline' : 'success'"
								:button-color="sale.paid ? 'bgSecondary' : 'successContainer'"
								@click.stop="() => {
									if (sale.paid) return
									saleTempData = sale
									dialogPayment = true
								}"
							/>
						</td>
					</tr>
				</thead>
			</table>
    </BTable>
  </div>
	<DDeleteConfirmation
		:sale-id="deleteDialogData?.id ?? '-'"
		v-model="deleteDialog"
		@success-delete="() => {
			toast('Berhasil Menghapus Pembelian', {
				type: 'success',
			})
			deleteDialog = false
			getData()
		}"
	/>
	<DPayment
		:is-paying="isLoadingPay"
		v-model="dialogPayment"
		:remeaning-payment="remeaningPayment(saleTempData?.payments ?? [], saleTempData?.grand_total ?? 0)"
		@pay="(v) => onPay({
			paymentDate: v.date,
			paymentMethod: v.paymentMethod
		})"
	/>
	<DSaleFilter
		:filter="filter"
		v-model="filterDialog"
		@on-apply="v => {
			filter = v
			filterDialog = false
			getData()
		}"
	/>
</template>
