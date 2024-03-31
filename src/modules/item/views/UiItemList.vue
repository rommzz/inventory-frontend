<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BDialog from '@/components/BDialog.vue';
import BIcon from '@/components/BIcon.vue';
import BTable from '@/components/BTable.vue';
import type { BTableQuery } from '@/components/types/BTable';
import { formatIDR } from '@/plugin/helpers';
import type { MetaData } from '@/utils/apis/http';
import type { InventoryItem } from '@/utils/apis/models/model';
import type { InventoryItemFilter } from '@/utils/apis/repo/inventoryItemApi';
import moment from 'moment';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import DFileImport from '../components/dialogs/DFileImport.vue';
import { useItemStore } from '../stores';
import DFilterItem from '../components/dialog/DFilterItem.vue';
const router = useRouter();
const store = useItemStore();

let query = reactive<BTableQuery>({
	limit: 10,
	offset: 0,
})
let filter = reactive<InventoryItemFilter>({})
const isLoading = ref<boolean>(false)
const isDeleting = ref<boolean>(false)
const metaData = ref<MetaData>({});
const items = ref<InventoryItem[]>([]);

const filterDialog = ref<boolean>(false)
const importDialog = ref<boolean>(false)
const deleteDialog = ref<boolean>(false)
const deleteDialogData = ref<InventoryItem | null>(null)

const onDelete = (item: InventoryItem) => {
	deleteDialogData.value = item;
	deleteDialog.value = true;
}

const onChangeQuery = (q: BTableQuery) => {
	Object.assign(query, q)
	router.push({path: '/data/item', query})
	getItems()
}

const getItems = async () => {
	isLoading.value = true;
	store.getListItem(query, filter).then((res) => {
		items.value = res.data;
		metaData.value = res.meta ?? {};
	}).catch((err) => {
		console.error(err);
	}).finally(() => {
		isLoading.value = false;
	});
}

const deleteItems = () => {
	isDeleting.value = true;
	store.deleteItem(deleteDialogData.value!.id!).then(() => {
		deleteDialog.value = false
		deleteDialogData.value = null
		getItems();
	}).catch((err) => {
		console.error(err);
	}).finally(() => {
		isDeleting.value = false;
	});
}

const onApply = (v: InventoryItemFilter): void => {
	Object.assign(filter, v)
	console.log(filter);
	getItems()
}

onMounted(() => {
  getItems();
	const {limit, offset} = router.currentRoute.value.query
	Object.assign(query, {limit: limit ?? 10, offset: offset ?? 0})
})
</script>
<template>
  <div>
    <BTable
			:query="query"
      :total-items="metaData.count ?? 0"
			filter
			search-placeholder="cari barang"
			:displayed-total="items.length"
			@change:query="v => onChangeQuery(v)"
			@click:filter="filterDialog = true"
    >
			<template v-slot:action:group>
				<BButton
					label="Barang Baru"
					prepend-icon="add" 
					@click="router.push('/data/item/add')"
				/>
			</template>
			<table class="tw-table-auto tw-w-full tw-text-sm tw-text-onSurface">
				<thead>
					<tr class="tw-text-left !tw-p-4">
						<th
							v-for="header in [
								'SKU', 'Nama', 'Tipe', 'Tipe Mobil', 'Pemasok', 'Harga Barang', 'Stok Awal', 'Berlaku Dari', 'Aksi']"
							:key="header"
							class="tw-py-4 first:tw-pl-4 last:tw-pr-4 tw-font-semibold"
						>
							{{ header }}
						</th>
					</tr>
					<tr
						v-for="item, index in items"
						:key="index"
						class="tw-border-t tw-border-outlineVariant tw-py-4 tw-group"
					>
						<td class="tw-pl-4">
							{{ item.sku }}
						</td>
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
							{{ item.supplier.name }}
						</td>
						<td>
							{{ formatIDR(item.price) }}/{{ item.unit.name }}
						</td>
						<td>
							{{ item.initial_stock }}
						</td>
						<td>
							{{ moment(item.created_at).format('DD MMM yyyy') }}
						</td>
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4 [&>*]:hover:tw-cursor-pointer">
							<BIcon @click="onDelete(item)" icon="delete" color="error" class="tw-mr-2" button-color="errorContainer"></BIcon>
							<BIcon icon="edit_square" color="warning" @click="router.push('/data/item/' + item.id)" button-color="warningContainer"></BIcon>
						</td>
					</tr>
				</thead>
			</table>
    </BTable>
  </div>
	<DFileImport
		v-model="importDialog"
	/>
	<BDialog
		title="Apakah anda yakin?"
		v-model="deleteDialog"
		:persistent="isDeleting"
	>
		<div class="">
			<p class="tw-text-onSurfaceVariant tw-text-sm">
				Proses penghapusan barang dengan nama <b>“{{deleteDialogData?.name}}”</b> akan mengakibatkan data tersebut tidak dapat dikembalikan.
			</p>
			<div class="tw-p-5 tw-text-right tw-pt-8">
				<BButton class="tw-mr-2" label="Batalkan" @click="deleteDialog = false"></BButton>
				<BButton :is-loading="isDeleting" variant="text" color="danger" label="Lanjutkan" @click="deleteItems"></BButton>
			</div>
		</div>
	</BDialog>
	<DFilterItem
		:filter="filter"
		v-model="filterDialog"
		@apply="onApply"
	/>
</template>
