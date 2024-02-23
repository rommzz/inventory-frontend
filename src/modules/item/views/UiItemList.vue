<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BDialog from '@/components/BDialog.vue';
import BIcon from '@/components/BIcon.vue';
import BTable from '@/components/BTable.vue';
import type { Supplier } from '@/utils/apis/models/model';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const suppliers = ref<Supplier[]>([]);

const deleteDialog = ref<boolean>(false)
const deleteDialogData = ref<Supplier | null>(null)

const onDelete = (supplier: Supplier) => {
	deleteDialogData.value = supplier;
	deleteDialog.value = true;
}

onMounted(() => {
  suppliers.value = [
    {
      readid: '1',
      name: 'John Doe 1',
      company_name: 'John Doe Company 1',
      email: 'email 1',
      address: 'address',
      phone: 'phone',
      logo: 'https://w7.pngwing.com/pngs/853/105/png-transparent-daihatsu-boon-car-toyota-logo-car-angle-triangle-transport-thumbnail.png',
      created_at: 'created_at',
      deleted_at: 'deleted_at',
      updated_at: 'updated_at',
    },
    {
      readid: '2',
      name: 'John Doe 2',
      company_name: 'John Doe Company 2',
      email: 'email 2',
      address: 'address',
      phone: 'phone',
      logo: 'https://w7.pngwing.com/pngs/853/105/png-transparent-daihatsu-boon-car-toyota-logo-car-angle-triangle-transport-thumbnail.png',
      created_at: 'created_at',
      deleted_at: 'deleted_at',
      updated_at: 'updated_at',
    },
    {
      readid: '3',
      name: 'John Doe 3',
      company_name: 'John Doe Company 3',
      email: 'email 3',
      address: 'address coy',
      phone: 'phone',
      logo: 'https://w7.pngwing.com/pngs/853/105/png-transparent-daihatsu-boon-car-toyota-logo-car-angle-triangle-transport-thumbnail.png',
      created_at: 'created_at',
      deleted_at: 'deleted_at',
      updated_at: 'updated_at',
    },

  ]
})
</script>
<template>
  <div>
    <BTable
      :offset="20"
      :total-items="100"
      label-add-button="Barang Baru"
      @click:action="router.push('/data/item/add')"
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
