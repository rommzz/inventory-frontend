<script setup lang="ts">
import BDetailCard from '@/components/BDetailCard.vue';
import BListItem from '@/components/BListItem.vue';
import type { BListItemProps } from '@/components/types/BListItem';
import { roleList } from '@/utils/apis/models/commons';
import type { User } from '@/utils/apis/models/model';
import { computed, onMounted, ref } from 'vue';
import DDeleteUser from '../component/dialog/DDeleteUser.vue';
import { useUserStore } from '../stores';
import DAccountEdit from '../component/dialog/DAccountEdit.vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
  id?: string;
}>();

const router = useRouter()

const store = useUserStore();

let user = ref<User>()
const editDialog = ref<boolean>(false)
const deleteDialog = ref<boolean>(false)
const isLoading = ref<boolean>(false);
const isEdit = props.id !== undefined;
const valueCheck = (v?: string): string => {
	return v == '' || v == undefined ? '-' : v;
}

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
		data: valueCheck(user.value?.email),
		title: 'Email'
	},
	{
		icon: 'call',
		data: valueCheck(user.value?.phone),
		title: 'No. Telepon'
	},
	{
		icon: 'account_circle',
		data: valueCheck(user.value?.phone),
		title: 'No. Telepon'
	},
	{
		icon: 'location_on',
		data: valueCheck(user.value?.phone),
		title: 'Alamat'
	},
])

const userInfo: (BListItemProps & {onclick: () => void})[] = [
  {
		icon: 'edit_square',
    title: 'Edit Karyawan',
		data: 'Perbarui informasi karyawan',
		onclick: () => {
			router.push(`/user/${user.value!.id}/edit`)
		}
	},
  {
		icon: 'account_circle',
    title: 'Edit Akun Karyawan',
		data: 'Perbarui informasi akun karyawan',
		onclick: () => {
			editDialog.value = true
		}
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
						class="tw-cursor-pointer"
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
		<DAccountEdit
			v-model="editDialog"
			:user="user!"
		/>
  </div>
</template>