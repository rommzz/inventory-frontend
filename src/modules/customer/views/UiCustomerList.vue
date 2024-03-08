<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BDialog from '@/components/BDialog.vue';
import BIcon from '@/components/BIcon.vue';
import BTable from '@/components/BTable.vue';
import type { BTableQuery } from '@/components/types/BTable';
import type { MetaData } from '@/utils/apis/http';
import type { Customer } from '@/utils/apis/models/model';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCustomerStore } from '../stores';

const router = useRouter();
const store = useCustomerStore();

let query = reactive<BTableQuery>({
	limit: 10,
	offset: 0,
})

const customers = ref<Customer[]>([]);
const isLoading = ref<boolean>(false);
const isDeleting = ref<boolean>(false);
const metaData = ref<MetaData>({});

const deleteDialog = ref<boolean>(false)
const deleteDialogData = ref<Customer | null>(null)

const onDelete = (customer: Customer) => {
	deleteDialogData.value = customer;
	deleteDialog.value = true;
}

const getListCustomer = async () => {
	isLoading.value = true;
	store.getListCustomer(query).then((res) => {
		console.log(res);
		customers.value = res.data ?? [];
		metaData.value = res.meta ?? {};
	}).catch((err) => {
		console.error(err);
	}).finally(() => {
		isLoading.value = false;
	});
}

const deleteCustomer = async (customerId: string) => {
	isDeleting.value = true
	try {
		await store.deleteCustomer(customerId)
	} catch (error) {
		console.log(error);
	}
	isDeleting.value = false
	deleteDialog.value = false
	getListCustomer()
}

const onChangeQuery = (q: BTableQuery) => {
	Object.assign(query, q)
	router.push({path: '/data/customer', query})
	getListCustomer()
}

onMounted(() => {
  getListCustomer();
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
      label-add-button="Pelanggan Baru"
			:displayed-total="customers.length"
      @click:action="router.push('/data/customer/add')"
			@change:query="v => onChangeQuery(v)"
    >
			<table class="tw-table-auto tw-w-full tw-text-sm tw-text-onSurface">
				<thead>
					<tr class="tw-text-left !tw-p-4">
						<th
							v-for="header in ['Nama', 'Email', 'No. Telepon', 'Perusahaan', 'Alamat', 'Aksi']"
							:key="header"
							class="tw-py-4 first:tw-pl-4 last:tw-pr-4 tw-font-semibold"
						>
							{{ header }}
						</th>
					</tr>
					<tr
						v-for="customer, index in customers"
						:key="index"
						class="tw-border-t tw-border-outlineVariant tw-group hover:tw-bg-surface"
						@click="router.push(`/data/customer/${customer.id}`)"
					>
						<td class="tw-py-4 tw-pl-4 ">
							{{ customer.name }}
						</td>
						<td class="tw-py-4">
							{{ customer.email == '' ? '-' : customer.email }}
						</td>
						<td class="tw-py-4">
							{{ customer.phone == '' ? '-' : customer.phone }}
						</td>
						<td class="tw-py-4">
							{{ customer.company_name == '' ? '-' : customer.company_name }}
						</td>
						<td class="tw-py-4 tw-w-1/4">
							{{ customer.address == '' ? '-' : customer.address }}
						</td>
						<td class="tw-py-4 tw-pr-4 [&>*]:hover:tw-cursor-pointer">
							<BIcon @click.stop="onDelete(customer)" icon="delete" color="error" class="tw-mr-2" button-color="errorContainer"></BIcon>
							<BIcon icon="edit_square" color="warning" @click="router.push(`/data/customer/${customer.id}/edit`)" button-color="warningContainer"></BIcon>
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
		<div class="">
			<p class="tw-text-onSurfaceVariant tw-text-sm">
				Proses penghapusan pemasok dengan nama <b>“{{deleteDialogData?.name}}”</b> akan mengakibatkan data tersebut tidak dapat dikembalikan.
			</p>
			<div class="tw-p-5 tw-text-right tw-pt-8">
				<BButton class="tw-mr-2" label="Batalkan" @click="deleteDialog = false"></BButton>
				<BButton @click="deleteCustomer(deleteDialogData!.id!)" :is-loading="isDeleting"  variant="text" color="danger" label="Lanjutkan"></BButton>
			</div>
		</div>
	</BDialog>
</template>
