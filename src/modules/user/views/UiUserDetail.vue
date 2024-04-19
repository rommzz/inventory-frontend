<script setup lang="ts">
import BDetailCard from '@/components/BDetailCard.vue';
import BListItem from '@/components/BListItem.vue';
import type { BListItemProps } from '@/components/types/BListItem';
import router from '@/router';
import { roleList } from '@/utils/apis/models/commons';
import type { User } from '@/utils/apis/models/model';
import { computed, onMounted, ref } from 'vue';
import DDeleteUser from '../component/dialog/DDeleteUser.vue';
import { useUserStore } from '../stores';

const props = defineProps<{
  id?: string;
}>();

const store = useUserStore();

let user = ref<User>()
const deleteDialog = ref<boolean>(false)
const isLoading = ref<boolean>(false);
const isEdit = props.id !== undefined;

onMounted(() => {
  // isEdit.value = props.id !== undefined;
  if (isEdit) {
    // fetch data from API
    getData()
  }
})

const getData = async () => {
  store.getUserDetail(props.id!).then(r => {
    user.value = r
	}).catch(e => {
    console.log(e);
  }).finally(() => {
    console.log('ok');
  })
}

const userData = computed<BListItemProps[]>(() => [
  {
		icon: 'person',
		data: user.value?.name,
		title: 'Nama karyawan'
	},
	{
		icon: 'key',
		data: roleList.find(v => v.value == user.value?.role_id)?.label,
		title: 'Role'
	},
	{
		icon: 'email',
		data: user.value?.email ?? '-',
		title: 'Email'
	},
	{
		icon: 'call',
		data: user.value?.phone ?? '-',
		title: 'No. Telepon'
	},
	{
		icon: 'account_circle',
		data: user.value?.phone,
		title: 'No. Telepon'
	},
	{
		icon: 'location_on',
		data: user.value?.address == '' ? '-' : user.value?.address ,
		title: 'Alamat'
	},
])

const userInfo: (BListItemProps & {onclick: () => void})[] = [
  {
		icon: 'edit_square',
    title: 'Edit Karyawan',
		data: 'Perbarui informasi karyawan',
		onclick: () => {
			router.push({path: `user/${user.value!.id}/edit`})
		}
	},
  {
		icon: 'account_circle',
    title: 'Edit Akun Karyawan',
		data: 'Perbarui informasi akun karyawan',
		onclick: () => {
			
		}
	},
  {
		icon: 'block',
    title: 'Blokir Akses',
		data: 'Batasai sementara akses karyawan ini',
		onclick : () => {}
	},
  {
		icon: 'delete',
    title: 'Hapus Karyawan',
		data: 'Hapus akun karyawan secara permanen',
		color: 'error',
		onclick: () => {
			deleteDialog.value = true
		}
	},
]


</script>
<template>
  <div>
    <VRow class="tw-gap-8">
      <VCol>
        <BDetailCard title="Data Karyawan">
          <div class="tw-text-onSurface ">
            <BListItem
							v-for="item, index in userData"
							:key="index"
							:title="item.title"
							:data="item.data"
							:icon="item.icon"
						/>
          </div>
        </BDetailCard>
      </VCol>
      <VCol>
        <BDetailCard title="Pengaturan Karyawan">
					<BListItem
						v-for="info, index in userInfo"
						:key="index"
						:icon="info.icon"
						:title="info.title"
						:data="info.data"
						:color="info.color"
						right-icon="chevron_right"
						class-data="tw-text-sm tw-text-onSurfaceVariant"
						@click="info.onclick()"
					/>
        </BDetailCard>
      </VCol>
    </VRow>
		<DDeleteUser
			v-model="deleteDialog"
			v-model:user-data="user"
			@on-delete="router.push({path: '/user'})"
		/>
  </div>
</template>