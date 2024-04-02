<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BDetailCard from '@/components/BDetailCard.vue';
import BListItem from '@/components/BListItem.vue';
import type { BIconName } from '@/components/types/BIcon';
import type { Purchase } from '@/utils/apis/models/model';
import moment from 'moment';
import { usePurchaseStore } from '../stores';
import { computed } from 'vue';
import { formatIDR, percentIdrView } from '@/plugin/helpers';
import DDeleteConfirmation from '../components/dialog/DDeleteConfirmation.vue';
import { ref } from 'vue';
import DPayment from '@/components/dialogs/DPayment.vue';
import BBill from '@/components/BBill.vue';
import BPayments from '@/components/BPayments.vue';

const props = defineProps<{
	id: string;
}>()

const store = usePurchaseStore()

const dialog = ref<boolean>(false)
const dialogPayment = ref<boolean>(false)

const data: Purchase = {
	"id": "BUY-240305-8065983",
	"created_at": "2024-03-05T22:15:06+07:00",
	"updated_at": "2024-03-05T22:15:06+07:00",
	"deleted_at": null,
	"total": 6000,
	"tax": 0,
	"discount": 0,
	"grand_total": 6000,
	"paid": 0,
	"purchase_date": "2024-03-04T03:26:30+07:00",
	"supplier_id": "SUP-240211-6340005",
	"supplier": {
		"id": "SUP-240211-6340005",
		"created_at": "2024-02-27T21:21:12+07:00",
		"updated_at": "2024-02-27T21:21:12+07:00",
		"deleted_at": null,
		"name": "Daihatsu Astra Jakarta",
		"company_name": "PT Astra Daihatsu Motor",
		"email": "",
		"phone": "",
		"logo": "",
		"address": "Jl. Pangeran Jayakarta No.28 , Mangga Dua Selatan, Sawah Besar, Jakarta Pusat"
	},
	"items": [
		{
			"id": "4f3be1e6-4a44-4a8e-911c-72aced5612f4",
			"created_at": "2024-03-05T22:15:06+07:00",
			"updated_at": "2024-03-05T22:15:06+07:00",
			"deleted_at": null,
			"item_purchase_id": "BUY-240305-8065983",
			"inventory_item_id": "ITM-240218-6625397",
			"qty": 2,
			"price_before": 1000,
			"price": 3000,
			"total": 0,
			"inventory_item": null
		},
		{
			"id": "4f3be1e6-4a44-4a8e-911c-72aced5612f4",
			"created_at": "2024-03-05T22:15:06+07:00",
			"updated_at": "2024-03-05T22:15:06+07:00",
			"deleted_at": null,
			"item_purchase_id": "BUY-240305-8065983",
			"inventory_item_id": "ITM-240218-6625397",
			"qty": 2,
			"price_before": 1000,
			"price": 3000,
			"total": 0,
			"inventory_item": null
		}
	],
	"payments": [
		{
			"id": "PAY-240305-4056333",
			"created_at": "2024-03-05T22:15:06+07:00",
			"updated_at": "2024-03-05T22:15:06+07:00",
			"deleted_at": null,
			"item_purchase_id": "BUY-240305-8065983",
			"payment_date": "2024-03-04T03:26:30+07:00",
			"payment_type": "dp",
			"payment_method": "cash",
			"amount": 5000,
			"remaining_payment": 1000,
			"note": "DP duls"
		},
		{
                "id": "PAY-240343-8441881",
                "created_at": "2024-03-29T19:56:44+07:00",
                "updated_at": "2024-03-29T19:56:44+07:00",
                "deleted_at": null,
                "item_purchase_id": "BUY-240343-3715211",
                "payment_date": "2024-03-30T03:29:30+07:00",
                "payment_type": "dp",
                "payment_method": "cash",
                "amount": 1000,
                "remaining_payment": 3000,
                "note": "DP duls"
            }
	]
}

const paymentStatus = computed(() => store.paymentStatus(data.payments ?? []))
const purchaseData: {
	icon: BIconName,
	title: string,
	value: string,
}[] = [
	{
		icon: 'receipt_long',
		title: "ID Pembelian",
		value: data.id,
	},
	{
		icon: 'person_outline',
		title: "Pemasok",
		value: data.supplier.company_name!,
	},
	{
		icon: 'calendar_today',
		title: "Tanggal Pembelian",
		value: moment(data.purchase_date).format('DD MMM yyyy'),
	},
]
</script>
<template>
	<div class="tw-grid tw-grid-cols-2 tw-gap-8">
		<BDetailCard title="Data Pembelian" class="tw-self-start">
			<BListItem
				v-for="detail, index in purchaseData"
				:key="index"
				:title="detail.title"
				:icon="detail.icon"
				:data="detail.value"
			/>
			<div>
				<div
					v-for="item in data.items"
					:key="item.id"
					class="tw-rounded-xl tw-border tw-border-outlineVariant tw-flex tw-justify-between tw-items-center tw-bg-surface tw-p-3 tw-mt-4 tw-font-semibold tw-text-sm tw-cursor-pointer"
				>
					<div>
						<div>
							{{ item.inventory_item }}
						</div>
						<div>
							{{ item.qty }} * {{ item.price }}
						</div>
					</div>
					<div>
						<div>
							total harga
						</div>
						<div>
							{{ item.qty * item.price }}
						</div>
					</div>
				</div>
			</div>
		</BDetailCard>
		<div>
			<BBill
				:discount="data.discount"
				:discount-percent="data.discount_percent"
				:tax="data.tax"
				:tax-percent="data.tax_percent"
				:total="data.total"
				:grand-total="data.grand_total"
				:payment-status="paymentStatus"
			/>
			<BPayments
				:payments="data.payments ?? []"
				:grand-total="data.grand_total"
				:paid="data.paid ?? 0"
				class="tw-mt-4"
			/>
			<BDetailCard title="Aksi" class="tw-mt-4">
				<div class="tw-flex tw-justify-end tw-gap-2">
					<BButton color="error" label="Hapus Pembelian" @click="dialog = true"></BButton>
					<BButton :disabled="paymentStatus == 'Lunas'" label="Bayar Pembelian" @click="dialogPayment = true"></BButton>
				</div>
			</BDetailCard>
		</div>
		<DDeleteConfirmation
			:purchase-id="props.id"
			v-model="dialog"
		/>
		<DPayment
			v-model="dialogPayment"
			:remeaning-payment="paymentStatus == 'Belum Dibayar' ? data.grand_total : data.payments![(data.payments?.length ?? 1) - 1].remaining_payment"
		/>
	</div>
</template>