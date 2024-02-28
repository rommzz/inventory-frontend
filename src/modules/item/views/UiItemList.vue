<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BDialog from '@/components/BDialog.vue';
import BIcon from '@/components/BIcon.vue';
import BTable from '@/components/BTable.vue';
import type { BTableQuery } from '@/components/types/BTable';
import type { MetaData } from '@/utils/apis/http';
import type { InventoryItem, Supplier } from '@/utils/apis/models/model';
import { reactive } from 'vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useItemStore } from '../stores';
import DFileImport from '../components/dialogs/DFileImport.vue';
import { formatIDR } from '@/plugin/helpers';
import moment from 'moment';
const router = useRouter();
const store = useItemStore();

let query = reactive<BTableQuery>({
	limit: 10,
	offset: 0,
})

const isLoading = ref<boolean>(false)
const isDeleting = ref<boolean>(false)
const metaData = ref<MetaData>({});
const items = ref<InventoryItem[]>([]);

const importDialog = ref<boolean>(false)
const deleteDialog = ref<boolean>(false)
const deleteDialogData = ref<InventoryItem | null>(null)

const onDelete = (item: InventoryItem) => {
	deleteDialogData.value = item;
	deleteDialog.value = true;
}

const onChangeQuery = (q: BTableQuery) => {
	Object.assign(query, q)
	router.push({path: '/data/supplier', query})
	getItems()
}

const getItems = async () => {
	isLoading.value = true;
	store.getListItem(query).then((res) => {
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
    >
			<template v-slot:action:group>
				<BButton label="Impor Barang" prepend-icon="cloud_upload" variant="outlined" prepend-icon-color="primary" @click="importDialog = true"/>
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
								'SKU', 'Nama', 'Merk', 'Pemasok', 'Satuan', 'Harga Beli', 'Stok Awal', 'Tanggal Masuk', 'Aksi']"
							:key="header"
							class="tw-py-4 first:tw-pl-4 last:tw-pr-4 tw-font-semibold"
						>
							{{ header }}
						</th>
					</tr>
					<tr
						v-for="item, index in items"
						:key="index"
						class="tw-border-t tw-border-outlineVariant tw-py-4 "
					>
						<td class="tw-pl-4">
							{{ item.sku }}
						</td>
						<td>
							{{ item.name }}
						</td>
						<td>
							{{ item.brand.name }}
						</td>	
						<td>
							{{ item.supplier.name }}
						</td>
						<td>
							{{ item.unit.name }}
						</td>
						<td>
							{{ formatIDR(item.price) }}
						</td>
						<td>
							{{ item.initial_stock }}
						</td>
						<td>
							{{ moment(item.created_at).format('d MMM yyyy') }}
						</td>
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4 [&>*]:hover:tw-cursor-pointer">
							<BIcon @click="onDelete(item)" icon="delete" color="error" class="tw-mr-8"></BIcon>
							<BIcon icon="edit_square" color="warning" @click="router.push('/data/item/' + item.id)"></BIcon>
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
		<div class="tw-px-5">
			<p class="tw-text-onSurfaceVariant tw-text-sm">
				Proses penghapusan barang dengan nama <b>“{{deleteDialogData?.name}}”</b> akan mengakibatkan data tersebut tidak dapat dikembalikan.
			</p>
			<div class="tw-p-5 tw-text-right tw-pt-8">
				<BButton class="tw-mr-2" label="Batalkan" @click="deleteDialog = false"></BButton>
				<BButton :is-loading="isDeleting" variant="text" color="danger" label="Lanjutkan" @click="deleteItems"></BButton>
			</div>
		</div>
	</BDialog>
</template>
