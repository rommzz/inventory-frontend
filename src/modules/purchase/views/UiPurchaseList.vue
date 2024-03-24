<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BDialog from '@/components/BDialog.vue';
import BIcon from '@/components/BIcon.vue';
import BTable from '@/components/BTable.vue';
import type { BTableQuery } from '@/components/types/BTable';
import type { MetaData } from '@/utils/apis/http';
import type { Purchase, Supplier } from '@/utils/apis/models/model';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePurchaseStore } from '../stores';
import type { InventoryItemFilter } from '@/utils/apis/repo/inventoryItemApi';
import { formatIDR } from '@/plugin/helpers';
import moment from 'moment';

const router = useRouter();
const store = usePurchaseStore();

let query = reactive<BTableQuery>({
	limit: 10,
	offset: 0,
})

let filter = reactive<InventoryItemFilter>({})
const purchases = ref<Purchase[]>([]);
const isLoading = ref<boolean>(false);
const isDeleting = ref<boolean>(false);
const metaData = ref<MetaData>({});

const deleteDialog = ref<boolean>(false)
const deleteDialogData = ref<Supplier | null>(null)

const onDelete = (supplier: Supplier) => {
	deleteDialogData.value = supplier;
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

// const deletePurchase = async (supplierId: string) => {
// 	isDeleting.value = true
// 	try {
// 		await store.deletePurchase(supplierId)
// 	} catch (error) {
// 		console.log(error);
// 	}
// 	isDeleting.value = false
// 	deleteDialog.value = false
// 	getPurchase()
// }

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
					<tr v-for="purchase, index in purchases" :key="index" class="tw-border-t tw-border-outlineVariant tw-group">
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4 tw-flex tw-items-center tw-gap-2">
							{{ purchase.id }}
						</td>
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4">
							{{ purchase.items }}
						</td>
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4">
							{{ formatIDR(purchase.grand_total) }}
						</td>
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4">
							{{ formatIDR(purchase.grand_total - (purchase.paid ?? 0)) }}
						</td>
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4">
							{{ purchase.grand_total - (purchase.paid ?? 0) > 0 ? 'Belum Lunas' : 'Lunas' }}
						</td>
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4">
							{{ moment(purchase.purchase_date).format('DD MMM yyy') }}
						</td>
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4 [&>*]:hover:tw-cursor-pointer">
							<BIcon @click="onDelete(purchase)" icon="delete" color="error" class="tw-mr-2" button-color="errorContainer"></BIcon>
							<BIcon icon="payments" color="success" button-color="successContainer"></BIcon>
						</td>
					</tr>
				</thead>
			</table>
    </BTable>
  </div>
	<BDialog
		title="Apakah anda yakin?"
		v-model="deleteDialog"
		:persistent="isDeleting"
	>
		<div class="tw-px-5">
			<p class="tw-text-onSurfaceVariant tw-text-sm">
				Proses penghapusan pemasok dengan nama <b>“{{deleteDialogData?.name}}”</b> akan mengakibatkan data tersebut tidak dapat dikembalikan.
			</p>
			<div class="tw-p-5 tw-text-right tw-pt-8">
				<BButton class="tw-mr-2" label="Batalkan" @click="deleteDialog = false"></BButton>
				<BButton  :is-loading="isDeleting"  variant="text" color="danger" label="Lanjutkan"></BButton>
			</div>
		</div>
	</BDialog>
</template>
