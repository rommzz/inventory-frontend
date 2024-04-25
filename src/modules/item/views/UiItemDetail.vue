<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BDetailCard from '@/components/BDetailCard.vue';
import BListItem from '@/components/BListItem.vue';
import type { BIconName } from '@/components/types/BIcon';
import type { Customer, InventoryItem } from '@/utils/apis/models/model';
import { computed, onMounted, ref } from 'vue';
import { useItemStore } from '../stores';
import { formatIDR } from '@/plugin/helpers';
import moment from 'moment';

const props = defineProps<{
  id?: string;
}>();

const store = useItemStore();

let data = ref<InventoryItem>()
const isLoading = ref<boolean>(false);
const isEdit = props.id !== undefined;

const dateFormat = (date: string): string => moment(date).format('DD MMM yyyy')

onMounted(() => {
  // isEdit.value = props.id !== undefined;
  if (isEdit) {
    // fetch data from API
    getData()
  }
})

const getData = async () => {
  store.getItem(props.id!).then(r => {
    data.value = r
  }).catch(e => {
    console.log(e);
  }).finally(() => {
    console.log('ok');
  })
}

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
        <BDetailCard title="Data Barang">
          <template v-slot:action>
            <div class="tw-flex tw-gap-2">
              <BButton label="Hapus" color="error"></BButton>
              <BButton label="Edit" color="warning"></BButton>
            </div>
          </template>
          <div>
						<BListItem
							title="SKU"
							icon="inventory"
							:data="data?.sku"
						/>
						<BListItem
							title="Nama"
							icon="inventory_2"
							:data="data?.name"
						/>
						<BListItem
							title="Tipe Barang"
							icon="package"
							:data="data?.type"
						/>
						<BListItem
							title="Pemasok"
							icon="person"
							:data="data?.supplier.name"
						/>
						<BListItem
							title="Harga"
							icon="universal_currency_alt"
							:data="`${formatIDR(data?.price ?? 0)}/${data?.unit.name}`"
						/>
						<BListItem
							title="Stok Awal"
							icon="package_2"
							:data="`${data?.stock.stock} ${data?.unit.name}`"
						/>
					</div>
        </BDetailCard>
      </VCol>
      <VCol>
        <BDetailCard title="Detail Mobil">
					<div class="[&>div]:tw-flex [&>div]:tw-justify-between [&>div]:tw-mb-1 tw-text-sm tw-text-onSurfaceVariant [&_h5]:tw-text-onSurface ">
						<div>
							<span>
								Kode Mobil
							</span>
							<h5>
								{{ data?.car_code.code }}
							</h5>
						</div>
						<div>
							<span>
								Tipe Mobil
							</span>
							<h5>
								{{ data?.car_code.car_type.name }}
							</h5>
						</div>
						<div>
							<span>
								Grup Tipe Mobil
							</span>
							<h5>
								{{ data?.car_code.car_type.car_group_type.name }}
							</h5>
						</div>
					</div>
        </BDetailCard>
				<BDetailCard title="Informasi Barang" class="tw-mt-4">
					<div class="[&>div]:tw-flex [&>div]:tw-justify-between [&>div]:tw-mb-1 tw-text-sm tw-text-onSurfaceVariant [&_h5]:tw-text-onSurface ">
						<div>
							<span>
								M Group
							</span>
							<h5>
								{{ data?.m_group == '' ? '-' : data?.m_group }}
							</h5>
						</div>
						<div>
							<span>
								Product Hierarchy
							</span>
							<h5>
								{{ data?.product_hierarchy == '' ? '-' : data?.product_hierarchy }}
							</h5>
						</div>
						<div>
							<span>
								Rekomendasi Pajak
							</span>
							<h5>
								{{ data?.tax_recommendation ?? 0 }}%
							</h5>
						</div>
						<div>
							<span>
								Berlaku Dari
							</span>
							<h5>
								{{ dateFormat(data?.valid_from!) }}
							</h5>
						</div>
						<div>
							<span>
								Dibuat Pada
							</span>
							<h5>
								{{ dateFormat(data?.created_at!) }}
							</h5>
						</div>
						<div>
							<span>
								Diperbarui Pada
							</span>
							<h5>
								{{ dateFormat(data?.updated_at!) }}
							</h5>
						</div>
					</div>
					<div class="tw-mt-5">
						<div class="tw-text-sm tw-text-shadow tw-font-semibold">
							Dokumentasi Barang 
						</div>
						<span class="tw-text-sm tw-text-onSurfaceVariant ">
							Tidak ada dokumentasi barang untuk ditampilkan.
						</span>
					</div>
        </BDetailCard>
      </VCol>
    </VRow>
  </div>
</template>