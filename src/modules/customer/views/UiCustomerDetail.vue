<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BDetailCard from '@/components/BDetailCard.vue';
import BIcon from '@/components/BIcon.vue';
import BListItem from '@/components/BListItem.vue';
import type { BIconName } from '@/components/types/BIcon';
import type { Customer } from '@/utils/apis/models/model';
import { computed, onMounted, ref } from 'vue';
import { useCustomerStore } from '../stores';

const props = defineProps<{
  id?: string;
}>();

const store = useCustomerStore();

let customer = ref<Customer>()
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
  store.getCustomer(props.id!).then(r => {
    customer.value = r
  }).catch(e => {
    console.log(e);
  }).finally(() => {
    console.log('ok');
  })
}

const customerData = computed<{
	icon: BIconName,
	data?: string,
}[]>(() => [
  {
		icon: 'person',
		data: customer.value?.name
	},
  {
		icon: 'alternate_email',
		data: customer.value?.email
	},
  {
		icon: 'call',
		data: customer.value?.phone
	},
  {
		icon: 'business_center',
		data: customer.value?.company_name
	},
  {
		icon: 'location_on',
		data: customer.value?.address
	},
])

const customerInfo = computed<{
	icon: BIconName,
  title: string,
	data?: string,
}[]>(() => [
  {
		icon: 'universal_currency_alt',
    title: 'Total Transaksi',
		data: 'Rp500.000',
	},
  {
		icon: 'receipt_long',
    title: 'Jumlah Transaksi',
		data: '12',
	},
  {
		icon: 'receipt',
    title: 'Transaksi Terakhir',
		data: '19 Februari 2024',
	},
  {
		icon: 'calendar_today',
    title: 'Pelanggan Sejak',
		data: '3 Januari 2022',
	},
  {
		icon: 'update',
    title: 'Perbaruan Terakhir Data',
		data: '28 Desember 2023',
	},
])


</script>
<template>
  <div>
    <VRow class="tw-gap-8">
      <VCol>
        <BDetailCard title="Data Pelanggan">
          <template v-slot:action>
            <div class="tw-flex tw-gap-2">
              <BButton label="Hapus" color="error"></BButton>
              <BButton label="Edit" color="warning"></BButton>
            </div>
          </template>
          <div class="tw-text-onSurface ">
            <div
              v-for="cust, index in customerData"
              :key="index"
              class="tw-flex tw-items-center tw-gap-4 tw-p-4"
            >
              <BIcon :icon="cust.icon"></BIcon>
              <span>{{ cust?.data == '' ? '-' : cust.data }}</span>
            </div>
          </div>
        </BDetailCard>
      </VCol>
      <VCol>
        <BDetailCard title="Informasi Pelanggan">
					<BListItem
						v-for="info, index in customerInfo"
						:key="index"
						:icon="info.icon"
						:title="info.title"
						:data="info.data"
					/>
        </BDetailCard>
      </VCol>
    </VRow>
  </div>
</template>