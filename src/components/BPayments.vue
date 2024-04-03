
<script setup lang="ts">
import type { Payment } from '@/utils/apis/models/model';
import BDetailCard from './BDetailCard.vue';
import { formatIDR } from '@/plugin/helpers';
import moment from 'moment';
import { paymentMethodlist } from '@/plugin/globalVar';

const props = defineProps<{
	payments: Payment[]
	class?: string
	grandTotal: number
	paid: number
}>()

const lastPayment = (): Payment | undefined => {
	if (props.payments?.length) {
		return props.payments[props.payments.length - 1]
	} else {
		return undefined
	}
}

</script>
<template>
	<BDetailCard title="Rincian Pembayaran" :class="props.class" class="tw-text-base">
		<div v-if="payments.length == 0">
			Belum ada Pembayaran
		</div>
		<template v-else>
			<template
				v-for="payment, key in payments"
				:key="payment.id"
			>
				<VDivider v-if="key > 0" class="tw-my-2"></VDivider>
				<div
					class="[&>*]:tw-flex [&>*]:tw-justify-between [&>*]:tw-mb-1 tw-text-onSurfaceVariant tw-text-sm"
				>
					<div>
						<span>
							Tipe Pembayaran
						</span>
						<span>
							{{ payment.payment_type }}
						</span>
					</div>
					<div>
						<span>
							Metode Pembayaran
						</span>
						<span>
							{{ paymentMethodlist.find(v => v.value == payment.payment_method)?.title }}
						</span>
					</div>
					<div>
						<span>
							Nominal Pembayaran
						</span>
						<span>
							{{ formatIDR(payment.amount) }}
						</span>
					</div>
					<div class="tw-m-0">
						<span>
							Tanggal Pembayaran
						</span>
						<span>
							{{ moment(payment.payment_date).format('DD MMM yyyy') }}
						</span>
					</div>
				</div>
			</template>
		</template>
		<VDivider class="tw-my-4"/>
		<div class="[&>*]:tw-flex [&>*]:tw-justify-between tw-font-semibold">
			<div>
				<span>
					Sisa Bayar
				</span>
				<span>
					{{ formatIDR(lastPayment()?.remaining_payment ?? 0) }}
				</span>
			</div>
			<div class="tw-mt-2">
				<span>
					Terbayar
				</span>
				<span>
					{{ formatIDR(grandTotal - (lastPayment()?.remaining_payment ?? 0)) }}
				</span>
			</div>
		</div>
	</BDetailCard>
</template>