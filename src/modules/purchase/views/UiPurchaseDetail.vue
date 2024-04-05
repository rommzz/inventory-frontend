<script setup lang="ts">
import BBill from '@/components/BBill.vue';
import BButton from '@/components/BButton.vue';
import BDetailCard from '@/components/BDetailCard.vue';
import BListItem from '@/components/BListItem.vue';
import BPayments from '@/components/BPayments.vue';
import DPayment from '@/components/dialogs/DPayment.vue';
import type { BIconName } from '@/components/types/BIcon';
import { formatIDR } from '@/plugin/helpers';
import type { PaymentMethod } from '@/utils/apis/models/commons';
import type { Purchase } from '@/utils/apis/models/model';
import moment from 'moment';
import { computed, onMounted, ref } from 'vue';
import DDeleteConfirmation from '../components/dialog/DDeleteConfirmation.vue';
import { usePurchaseStore } from '../stores';
import { toast } from 'vue3-toastify';

const props = defineProps<{
	id: string;
}>()

const store = usePurchaseStore()

const dialog = ref<boolean>(false)
const dialogPayment = ref<boolean>(false)
const isLoading = ref<boolean>(true)
const isLoadingPay = ref<boolean>(false)

const data = ref<Purchase>()

const paymentStatus = computed(() => store.paymentStatus(data!.value?.payments ?? []))
const purchaseData = ref<{
	icon: BIconName,
	title: string,
	value: string,
}[]>([
	{
		icon: 'receipt_long',
		title: "ID Pembelian",
		value: props.id,
	},
	{
		icon: 'person_outline',
		title: "Pemasok",
		value: data.value?.supplier.company_name!,
	},
	{
		icon: 'calendar_today',
		title: "Tanggal Pembelian",
		value: moment(data?.value?.purchase_date).format('DD MMM yyyy'),
	},
]) 

const getData = async () => {
	isLoading.value = true
	store.getPurchase(props.id).then(r => {
		data.value = r.data
	}).catch(e => {
		console.log(e);
	}).finally(() => isLoading.value = false)
}

const onPay = async ({paymentMethod, paymentDate}: {
	paymentMethod: PaymentMethod,
	paymentDate: string,
}) => {
	isLoadingPay.value = true
	store.payment(props.id, {
		amount: paymentStatus.value == 'Belum Dibayar' ? data?.value?.grand_total! : data?.value?.payments![(data?.value.payments?.length ?? 1) - 1].remaining_payment!,
		payment_date: moment(paymentDate).utc().format(),
		payment_method: paymentMethod,
	}).then(() => {
		getData()
	}).catch(e => {
		toast(e.msg ?? e, {
			type: 'error'
		})
	}).finally(() => {
		dialog.value = false
		isLoading.value = false
		isLoadingPay.value = false
		dialogPayment.value = false
	})
}

onMounted(() => {
	getData()
})
</script>
<template>
	<div class="tw-grid tw-grid-cols-2 tw-gap-8" v-if="!isLoading">
		<BDetailCard title="Data Pembelian" class="tw-self-start" >
			<BListItem
				v-for="detail, index in purchaseData"
				:key="index"
				:title="detail.title"
				:icon="detail.icon"
				:data="detail.value"
			/>
			<div>
				<div
					v-for="item in data?.items"
					:key="item.id"
					class="tw-rounded-xl tw-border tw-border-outlineVariant tw-flex tw-justify-between tw-items-center tw-bg-surface tw-p-3 tw-mt-4 tw-font-semibold tw-text-sm tw-cursor-pointer"
				>
					<div>
						<div class="tw-mb-1">
							{{ item.inventory_item.name }} - {{ item.inventory_item.car_code?.car_type.name ?? '' }}
						</div>
						<div class="tw-font-normal tw-text-sm tw-text-onSurfaceVariant">
							{{ item.qty }} {{ item.inventory_item.unit?.name ?? '' }} x {{ formatIDR(item.price) }}
						</div>
					</div>
					<div class="tw-min-w-24">
						<div class="tw-font-normal tw-text-sm tw-text-onSurfaceVariant">
							Total Harga
						</div>
						<div>
							{{ formatIDR(item.qty * item.price) }}
						</div>
					</div>
				</div>
			</div>
		</BDetailCard>
		<div>
			<BBill
				:discount="data?.discount"
				:discount-percent="data?.discount_percent"
				:tax="data?.tax"
				:tax-percent="data?.tax_percent"
				:total="data?.total!"
				:grand-total="data?.grand_total!"
				:payment-status="paymentStatus"
			/>
			<BPayments
				:payments="data?.payments!"
				:grand-total="data?.grand_total!"
				:paid="data?.paid ?? 0"
				class="tw-mt-4"
			/>
			<BDetailCard title="Aksi" class="tw-mt-4" v-if="paymentStatus !== 'Lunas'">
				<div class="tw-flex tw-justify-end tw-gap-2">
					<BButton color="error" label="Hapus Pembelian" @click="dialog = true"></BButton>
					<BButton label="Bayar Pembelian" @click="dialogPayment = true"></BButton>
				</div>
			</BDetailCard>
		</div>
		<DDeleteConfirmation
			:purchase-id="props.id"
			v-model="dialog"
		/>
		<DPayment
			:is-paying="isLoadingPay"
			v-model="dialogPayment"
			:remeaning-payment="paymentStatus == 'Belum Dibayar' ? data?.grand_total! : data?.payments![(data?.payments?.length ?? 1) - 1].remaining_payment!"
			@pay="(v) => onPay({
				paymentDate: v.date,
				paymentMethod: v.paymentMethod
			})"
		/>
	</div>
</template>