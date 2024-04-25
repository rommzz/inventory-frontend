<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BDialog from '@/components/BDialog.vue';
import BIcon from '@/components/BIcon.vue';
import BTable from '@/components/BTable.vue';
import type { BTableQuery } from '@/components/types/BTable';
import type { MetaData } from '@/utils/apis/http';
import { roleList } from '@/utils/apis/models/commons';
import type { User } from '@/utils/apis/models/model';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores';
import bToast from '@/plugin/btoast';
import DDeleteUser from '../component/dialog/DDeleteUser.vue';

const router = useRouter();
const store = useUserStore();

let query = reactive<BTableQuery>({
	limit: 10,
	offset: 0,
})

const users = ref<User[]>([]);
const isLoading = ref<boolean>(false);
const isDeleting = ref<boolean>(false);
const metaData = ref<MetaData>({});

const deleteDialog = ref<boolean>(false)
const deleteDialogData = ref<User | null>(null)

const onDelete = (user: User) => {
	deleteDialogData.value = user;
	deleteDialog.value = true;
}

const getListUser = async () => {
	isLoading.value = true;
	store.getUsers(query).then((res) => {
		console.log(res);
		users.value = res.data ?? [];
		metaData.value = res.meta ?? {};
	}).catch((err) => {
		console.error(err);
	}).finally(() => {
		isLoading.value = false;
	});
}

const deleteUser = async (userId: string) => {
	isDeleting.value = true
	try {
		await store.deleteUser(userId)
		bToast('Data berhasil dihapus')
		getListUser()
	} catch (error) {
		console.log(error);
		bToast((error as any).msg ?? error, 'error')
	}
	isDeleting.value = false
	deleteDialog.value = false
}

const onChangeQuery = (q: BTableQuery) => {
	Object.assign(query, q)
	router.push({path: '/user', query})
	getListUser()
}

onMounted(() => {
  getListUser();
	const {limit, offset} = router.currentRoute.value.query
	Object.assign(query, {limit: limit ?? 10, offset: offset ?? 0})
	console.log(query);
})
</script>
<template>
  <div>
    <BTable
			:query="query"
			search-placeholder="Cari karyawan"
      :total-items="metaData.count ?? users.length"
      label-add-button="Karyawan Baru"
			:displayed-total="users.length"
      @click:action="router.push('/user/add')"
			@change:query="v => onChangeQuery(v)"
    >
			<table class="tw-table-auto tw-w-full tw-text-sm tw-text-onSurface">
				<thead>
					<tr class="tw-text-left !tw-p-4">
						<th
							v-for="header in ['Nama', 'Email', 'No. Telepon', 'Role', 'Alamat', 'Aksi']"
							:key="header"
							class="tw-py-4 first:tw-pl-4 last:tw-pr-4 tw-font-semibold"
						>
							{{ header }}
						</th>
					</tr>
					<tr
						v-for="user, index in users"
						:key="index"
						class="tw-border-t tw-border-outlineVariant tw-group hover:tw-bg-surface"
						@click="router.push(`/user/${user.id}`)"
					>
						<td class="tw-py-4 tw-pl-4 ">
							{{ user.name }}
						</td>
						<td class="tw-py-4">
							{{ user.email == '' ? '-' : user.email }}
						</td>
						<td class="tw-py-4">
							{{ user.phone == '' ? '-' : user.phone }}
						</td>
						<td class="tw-py-4">
							{{ roleList.find(v => v.value == user.role_id)?.label  }}
						</td>
						<td class="tw-py-4 tw-w-1/4">
							{{ 'alamat' }}
						</td>
						<td class="tw-py-4 tw-pr-4 [&>*]:hover:tw-cursor-pointer">
							<BIcon @click.stop="onDelete(user)" icon="delete" color="error" class="tw-mr-2" button-color="errorContainer"></BIcon>
							<BIcon icon="edit_square" color="warning" @click.stop="router.push(`/user/${user.id}/edit`)" button-color="warningContainer"></BIcon>
						</td>
					</tr>
				</thead>
			</table>
    </BTable>
  </div>
	<DDeleteUser
		v-model="deleteDialog"
		v-model:user-data="deleteDialogData!"
		@on-delete="getListUser()"
	/>
</template>
