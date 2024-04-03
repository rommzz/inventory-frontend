<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BTable from '@/components/BTable.vue';
import type { BTableQuery } from '@/components/types/BTable';
import { formatIDR } from '@/plugin/helpers';
import type { MetaData } from '@/utils/apis/http';
import type { ItemType } from '@/utils/apis/models/commons';
import type { InventoryItem } from '@/utils/apis/models/model';
import type { InventoryItemFilter } from '@/utils/apis/repo/inventoryItemApi';
import moment from 'moment';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import DFileImport from '../components/dialog/DFileImport.vue';
import DFilterItem from '../components/dialog/DFilterItem.vue';
import DPriceEdit from '../components/dialog/DPriceEdit.vue';
import { useItemStore } from '../stores';
import { toast } from 'vue3-toastify';
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

const stocks: {
    name: string;
    type: ItemType;
    carType: string;
    price: number;
    priceBefore: number;
    stock: number;
    created_at: string;
    updated_at: string;
		unit: {
			name: string
			id: string
		}
}[] = [
    {
        name: "Brake Pad",
        type: "PART",
        carType: "SUV",
        price: 50,
        priceBefore: 60,
        stock: 100,
        created_at: "2023-01-01",
        updated_at: "2023-01-01",
        unit: {
            name: "Pair",
            id: "1234"
        }
    },
    {
        name: "Engine Oil",
        type: "OLI",
        carType: "All",
        price: 30,
        priceBefore: 35,
        stock: 150,
        created_at: "2023-02-15",
        updated_at: "2023-03-10",
        unit: {
            name: "Liter",
            id: "5678"
        }
    },
    {
        name: "Headlight Bulb",
        type: "PART",
        carType: "Sedan",
        price: 10,
        priceBefore: 12,
        stock: 200,
        created_at: "2023-03-20",
        updated_at: "2023-04-05",
        unit: {
            name: "Piece",
            id: "91011"
        }
    },
    // Add more items here
];

const filterDialog = ref<boolean>(false)
const importDialog = ref<boolean>(false)
const priceEditDialog = ref<boolean>(false)
const deleteDialogData = ref<InventoryItem | null>(null)

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


let selectedItem: any = null

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
							{{ item.carType }}
						</td>	
						<td>
							{{  formatIDR(item.price) }}/{{ item.unit.name }}
						</td>
						<td>
							{{ formatIDR(item.priceBefore) }}/{{ item.unit.name }}
						</td>
						<td>
							{{ item.stock }}
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
