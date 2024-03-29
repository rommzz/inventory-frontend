<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BDetailCard from '@/components/BDetailCard.vue';
import BListItem from '@/components/BListItem.vue';
import type { BIconName } from '@/components/types/BIcon';

const props = defineProps<{
	id: string;
}>()

const purchaseData: {
	icon: BIconName,
	title: string,
	value: string,
}[] = [
	{
		icon: 'receipt_long',
		title: "ID Pembelian",
		value: 'PRCHS-0001',
	},
	{
		icon: 'person_outline',
		title: "Pemasok",
		value: 'PT Pemasok Handal',
	},
	{
		icon: 'calendar_today',
		title: "Tanggal Pembelian",
		value: '1 Maret 2024',
	},
]
</script>
<template>
	<div class="tw-grid tw-grid-cols-2 tw-gap-8">
		<BDetailCard title="Data Pembelian">
			<BListItem
				v-for="detail, index in purchaseData"
				:key="index"
				:title="detail.title"
				:icon="detail.icon"
				:data="detail.value"
			/>
		</BDetailCard>
		<div>
			<BDetailCard title="Rincian Pembayaran">
				<BListItem
					v-for="detail, index in purchaseData"
					:key="index"
					:title="detail.title"
					:icon="detail.icon"
					:data="detail.value"
				/>
			</BDetailCard>
			<BDetailCard title="Aksi" class="tw-mt-4">
				<div class="tw-flex tw-justify-end tw-gap-2">
					<BButton color="error" label="Hapus Penjualan"></BButton>
					<BButton label="Bayar Pembelian"></BButton>
				</div>
			</BDetailCard>
		</div>
	</div>
</template>