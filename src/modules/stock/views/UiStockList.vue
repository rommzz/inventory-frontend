<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BTable from '@/components/BTable.vue';
import type { BTableQuery } from '@/components/types/BTable';
import bToast from '@/plugin/btoast';
import { formatIDR } from '@/plugin/helpers';
import type { MetaData } from '@/utils/apis/http';
import type { InventoryItem } from '@/utils/apis/models/model';
import type { InventoryItemFilter } from '@/utils/apis/repo/inventoryItemApi';
import moment from 'moment';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import DFileImport from '../components/dialog/DFileImport.vue';
import DFilterItem from '../components/dialog/DFilterItem.vue';
import DPriceEdit from '../components/dialog/DPriceEdit.vue';
import { useStockStore } from '../stores';
import { onBeforeUnmount } from 'vue';
const router = useRouter();
const store = useStockStore();

let query = reactive<BTableQuery>({
	limit: 10,
	offset: 0,
})
let filter = reactive<InventoryItemFilter>({})
const isLoading = ref<boolean>(false)
const isImporting = ref<boolean>(false)
const metaData = ref<MetaData>({});
const stocks = ref<InventoryItem[]>([]);
const interval = ref()

const filterDialog = ref<boolean>(false)
const importDialog = ref<boolean>(false)
const priceEditDialog = ref<boolean>(false)

const onChangeQuery = (q: BTableQuery) => {
	Object.assign(query, q)
	router.push({path: '/data/item', query})
	getItems()
}

const getItems = async () => {
	isLoading.value = true;
	store.getListItem(query, filter).then((res) => {
		stocks.value = res.data;
		metaData.value = res.meta ?? {};
	}).catch((err) => {
		console.error(err);
	}).finally(() => {
		isLoading.value = false;
	});
}

let selectedItem: any = null

const onApply = (v: InventoryItemFilter): void => {
	Object.assign(filter, v)
	console.log(filter);
	getItems()
}

const onImport = async (file: File): Promise<void> => {
	isImporting.value = true
	return new Promise<void>((resolve, reject) => {
		store.importPriceList(file).then(() => {
			checkImportProgress()
			resolve()
		}).catch(e => {
			bToast(e.msg ?? e, 'error')
			reject()
		}).finally(() => isImporting.value = false)
	})
}

const setClearInterval = () => {
	isImporting.value = false
	clearInterval(interval.value)
	interval.value == undefined
}

const checkImportProgress = () => {
	const check = () => {
		store.getImportProgress().then(r => {
			if (r.progress == 100) {
				setClearInterval()
			} else {
				isImporting.value = true
			}
		}).catch(() => {
			setClearInterval()
		})
	}
	check();
	interval.value = setInterval(() => {
		check();
	}, 5000)
}

onMounted(() => {
	checkImportProgress();
  getItems();
	const {limit, offset} = router.currentRoute.value.query
	Object.assign(query, {limit: limit ?? 10, offset: offset ?? 0})
})

onBeforeUnmount(() => setClearInterval())

</script>
<template>
  <div>
    <BTable
			:query="query"
      :total-items="metaData.count ?? 0"
			filter
			search-placeholder="cari barang"
			:displayed-total="stocks.length"
			@change:query="v => onChangeQuery(v)"
			@click:filter="filterDialog = true"
    >
			<template v-slot:action:group>
				<BButton
					label="Impor Daftar Harga"
					prepend-icon="cloud_upload" 
					@click="importDialog = true"
				/>
				<BButton
					v-if="isImporting"
					label="Batalkan Impor"
					prepend-icon="dangerous"
					color="error"
					@click="store.cancelImport().then(() => {
						setClearInterval()
					})"
				/>
			</template>
			<table class="tw-table-auto tw-w-full tw-text-sm tw-text-onSurface">
				<thead>
					<tr class="tw-text-left !tw-p-4">
						<th
							v-for="header in [
								'Nama', 'Tipe Barang', 'Tipe Mobil', 'Harga Barang', 'Harga Sebelumnya', 'Stok Barang', 'Dibuat Pada', 'Terakhir Update', 'Aksi']"
							:key="header"
							class="tw-py-4 first:tw-pl-4 last:tw-pr-4 tw-font-semibold"
						>
							{{ header }}
						</th>
					</tr>
					<tr
						v-for="item, index in stocks"
						:key="index"
						class="tw-border-t tw-border-outlineVariant tw-py-4 tw-group first:[&>td]:tw-pl-4"
					>
						<td class="tw-flex tw-items-center tw-self-center tw-py-4 tw-gap-2">
							<div class=" tw-rounded-full tw-w-10 tw-h-10 tw-flex tw-place-items-center tw-justify-center group-even:tw-bg-primary group-odd:tw-bg-secondary tw-text-white tw-font-semibold tw-text-sm">
								{{ item.name.toUpperCase().substring(0,1) }}
							</div>
							<span>
								{{ item.name }}
							</span>
						</td>
						<td>
							{{ item.type }}
						</td>	
						<td>
							{{ item.car_code.car_type.name }}
						</td>	
						<td>
							{{  formatIDR(item.price) }}/{{ item.unit.name }}
						</td>
						<td>
							{{ formatIDR(item.stock.price_before) }}/{{ item.unit.name }}
						</td>
						<td>
							{{ item.stock.stock }}
						</td>
						<td>
							{{ moment(item.created_at).format('DD MMM yyyy') }}
						</td>
						<td>
							{{ moment(item.updated_at).format('DD MMM yyyy') }}
						</td>
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4 [&>*]:hover:tw-cursor-pointer">
							<BButton
								prepend-icon-color="warning"
								text-color="warning"
								prepend-icon="edit_square"
								color="warningContainer"
								label="Harga"
								@click="() => {
									selectedItem = item;
									priceEditDialog = true
								}"
							>
							</BButton>
						</td>
					</tr>
				</thead>
			</table>
    </BTable>
  </div>
	<DFileImport
		v-model="importDialog"
		:loading="isImporting"
		:on-import="onImport"
	/>
	<DFilterItem
		:filter="filter"
		v-model="filterDialog"
		@apply="onApply"
	/>
	<DPriceEdit
		:price="selectedItem?.price ?? 0"
		v-model="priceEditDialog"
		@success-edit="() => {
			priceEditDialog = false
			toast('Harga berhasil di edit', {
				type: 'success'
			})
		}"
	/>
</template>
