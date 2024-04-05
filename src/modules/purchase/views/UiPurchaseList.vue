<script setup lang="ts">
import BIcon from '@/components/BIcon.vue';
import BTable from '@/components/BTable.vue';
import DPayment from '@/components/dialogs/DPayment.vue';
import type { BTableQuery } from '@/components/types/BTable';
import { formatIDR } from '@/plugin/helpers';
import type { MetaData } from '@/utils/apis/http';
import type { PaymentMethod } from '@/utils/apis/models/commons';
import type { Payment, Purchase } from '@/utils/apis/models/model';
import type { InventoryItemFilter } from '@/utils/apis/repo/inventoryItemApi';
import moment from 'moment';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import DDeleteConfirmation from '../components/dialog/DDeleteConfirmation.vue';
import { usePurchaseStore } from '../stores';

const router = useRouter();
const store = usePurchaseStore();

let query = reactive<BTableQuery>({
	limit: 10,
	offset: 0,
})

let filter = reactive<InventoryItemFilter>({})
const purchases = ref<Purchase[]>([]);
const isLoading = ref<boolean>(false);
const isLoadingPay = ref<boolean>(false);
const isDeleting = ref<boolean>(false);
const metaData = ref<MetaData>({});

const deleteDialog = ref<boolean>(false)
const dialogPayment = ref<boolean>(false)
const deleteDialogData = ref<Purchase | null>(null)

const onDelete = (purchase: Purchase) => {
	deleteDialogData.value = purchase;
	deleteDialog.value = true;
}

const getPurchase = async () => {
	isLoading.value = true;
	store.getListPurchase(query).then((res) => {
		console.log(res);
		purchases.value = res.data ?? [];
		metaData.value = res.meta ?? {};
	}).catch((err) => {
		console.error(err);
	}).finally(() => {
		isLoading.value = false;
	});
}

let purchaseData: Purchase

const onPay = async ({paymentMethod, paymentDate,}: {
	paymentMethod: PaymentMethod,
	paymentDate: string,
}) => {
	isLoadingPay.value = true
	store.payment(purchaseData.id, {
		amount: remeaningPayment(purchaseData.payments ?? [], purchaseData.grand_total),
		payment_date: moment(paymentDate).utc().format(),
		payment_method: paymentMethod,
	}).then(() => {
		getPurchase()
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
	router.push({path: '/purchase', query})
	getPurchase()
}

onMounted(() => {
  getPurchase();
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
      label-add-button="Pembelian Baru"
			:displayed-total="purchases.length"
      @click:action="router.push('/purchase/add')"
			@change:query="v => onChangeQuery(v)"
			filter
    >
			<table class="tw-table-auto tw-w-full tw-text-sm tw-text-onSurface">
				<thead>
					<tr class="tw-text-left !tw-p-4">
						<th
							v-for="header in [ 'ID', 'Nama Barang', 'Grand Total', 'Sisa Bayar', 'Status Lunas', 'Tanggal Pembelian', 'Aksi',]"
							:key="header"
							class="tw-py-4 first:tw-pl-4 last:tw-pr-4 tw-font-semibold"
						>
							{{ header }}
						</th>
					</tr>
					<tr
						v-for="purchase, index in purchases"
						:key="index"
						class="tw-border-t tw-border-outlineVariant tw-group tw-cursor-pointer"
						@click="router.push('/purchase/' + purchase.id)"
					>
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4 tw-gap-2">
							{{ purchase.id }}
						</td>
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4">
							<div>
								<div>
									{{ purchase.items[0].inventory_item?.name ?? '-' }}
								</div>
								<span v-if="purchase.items.length > 1" class="tw-text-sm tw-text-outline">
									+ {{ purchase.items.length - 1 }} barang lainnya
								</span>
							</div>
							<v-tooltip
								v-if="purchase.items.length > 1"
								activator="parent"
								location="right"
							>
								<p v-for="item in purchase.items" :key="item.id">
									{{ item.inventory_item.name }}
								</p>
							</v-tooltip>
						</td>
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4">
							{{ formatIDR(purchase.grand_total) }}
						</td>
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4">
							{{ formatIDR(remeaningPayment(purchase.payments ?? [], purchase.grand_total)) }}
						</td>
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4">
							{{ purchase.paid ? 'Lunas' : purchase.payments?.length ? 'Belum Lunas' : 'Belum Bayar' }}
						</td>
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4">
							{{ moment(purchase.purchase_date).format('DD MMM yyy') }}
						</td>
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4 [&>*]:hover:tw-cursor-pointer">
							<BIcon @click.stop="onDelete(purchase)" icon="delete" color="error" class="tw-mr-2" button-color="errorContainer"></BIcon>
							<BIcon
								icon="payments"
								:color="purchase.paid ? 'outline' : 'success'"
								:button-color="purchase.paid ? 'bgSecondary' : 'successContainer'"
								@click.stop="() => {
									if (purchase.paid) return
									purchaseData = purchase
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
		:purchase-id="deleteDialogData?.id ?? '-'"
		v-model="deleteDialog"
		@success-delete="() => {
			toast('Berhasil Menghapus Pembelian', {
				type: 'success',
			})
			deleteDialog = false
			getPurchase()
		}"
	/>
	<DPayment
		:is-paying="isLoadingPay"
		v-model="dialogPayment"
		:remeaning-payment="remeaningPayment(purchaseData?.payments ?? [], purchaseData?.grand_total ?? 0)"
		@pay="(v) => onPay({
			paymentDate: v.date,
			paymentMethod: v.paymentMethod
		})"
	/>
</template>
