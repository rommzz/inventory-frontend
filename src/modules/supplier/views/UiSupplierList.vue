<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BDialog from '@/components/BDialog.vue';
import BIcon from '@/components/BIcon.vue';
import BTable from '@/components/BTable.vue';
import type { Supplier } from '@/utils/apis/models/model';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSupplierStore } from '../stores';
import type { MetaData } from '@/utils/apis/http'
const router = useRouter();
const store = useSupplierStore();

const suppliers = ref<Supplier[]>([]);
const isLoading = ref<boolean>(false);
const metaData = ref<MetaData>({});

const deleteDialog = ref<boolean>(false)
const deleteDialogData = ref<Supplier | null>(null)

const onDelete = (supplier: Supplier) => {
	deleteDialogData.value = supplier;
	deleteDialog.value = true;
}

const getSuppliers = async () => {
	isLoading.value = true;
	store.getListSupplier().then((res) => {
		console.log(res);
		suppliers.value = res.data;
		metaData.value = res.meta ?? {};
	}).catch((err) => {
		console.error(err);
	}).finally(() => {
		isLoading.value = false;
	});
}

onMounted(() => {
  getSuppliers();
})
</script>
<template>
  <div>
    <BTable
      :per-page="20"
      :total-items="metaData.count ?? 0"
      label-add-button="Pemasok Baru"
			:displayed-total="suppliers.length"
      @click:action="router.push('/data/supplier/add')"
    >
			<table class="tw-table-auto tw-w-full tw-text-sm tw-text-onSurface">
				<thead>
					<tr class="tw-text-left !tw-p-4">
						<th
							v-for="header in ['Perusahaan', 'Nama', 'Email', 'No. Telepon', 'Alamat', 'Aksi']"
							:key="header"
							class="tw-py-4 first:tw-pl-4 last:tw-pr-4 tw-font-semibold"
						>
							{{ header }}
						</th>
					</tr>
					<tr v-for="supplier, index in suppliers" :key="index" class="tw-border-t tw-border-outlineVariant">
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4 tw-flex tw-items-center tw-gap-2">
							<img :src="supplier.logo" class="tw-w-9 tw-h-9 tw-rounded-xl tw-object-cover" alt=""> <span>{{ supplier.company }}</span>
						</td>
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4">
							{{ supplier.name }}
						</td>
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4">
							{{ supplier.email }}
						</td>
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4">
							{{ supplier.phone }}
						</td>
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4">
							{{ supplier.address }}
						</td>
						<td class="tw-py-4 first:tw-pl-4 last:tw-pr-4 [&>*]:hover:tw-cursor-pointer">
							<BIcon @click="onDelete(supplier)" icon="delete" color="error" class="tw-mr-8"></BIcon>
							<BIcon icon="edit_square" color="warning" @click="router.push('/data/supplier/' + supplier.readid)"></BIcon>
						</td>
					</tr>
				</thead>
			</table>
    </BTable>
  </div>
	<BDialog
		title="Apakah anda yakin?"
		v-model="deleteDialog"
	>
		<div class="tw-px-5">
			<p class="tw-text-onSurfaceVariant tw-text-sm">
				Proses penghapusan pemasok dengan nama <b>“{{deleteDialogData?.name}}”</b> akan mengakibatkan data tersebut tidak dapat dikembalikan.
			</p>
			<div class="tw-p-5 tw-text-right tw-pt-8">
				<BButton class="tw-mr-2" label="Batalkan" @click="deleteDialog = false"></BButton>
				<BButton variant="text" color="danger" label="Lanjutkan" @click="deleteDialog = false"></BButton>
			</div>
		</div>
	</BDialog>
</template>
