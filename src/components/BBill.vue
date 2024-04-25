
<script setup lang="ts">
import type { PaymentStatus } from '@/modules/purchase/stores';
import { formatIDR, percentIdrView } from '@/plugin/helpers';
import BDetailCard from './BDetailCard.vue';

const props = defineProps<{
	paymentStatus: PaymentStatus
	total: number
	grandTotal: number
	discount?: number
	discountPercent?: number
	tax?: number
	taxPercent?: number
}>()

const discountValue = (): number => {
	if (props.discountPercent) {
		return props.total * (props.discountPercent / 100)
	}
	return props.discount || 0
}
</script>
<template>
	<BDetailCard title="Detail Tagihan">
		<template v-slot:action>
			<VChip :color="paymentStatus == 'Lunas' ? 'success' : 'error'" rounded="lg">{{ paymentStatus }}</VChip>
		</template>
		<div class="[&>*]:tw-flex [&>*]:tw-justify-between [&_span]:tw-text-onSurfaceVariant tw-text-onSurface">
			<div>
				<span>Subtotal</span>
				<h5>{{ formatIDR(props.total) }}</h5>
			</div>
			<div>
				<span>Diskon</span>
				<h5>{{ percentIdrView(props.discountPercent ?? 0, props.discount ?? 0, props.total) }}</h5>
			</div>
			<div>
				<span>Pajak</span>
				<h5>{{ percentIdrView(props.taxPercent ?? 0, props.tax ?? 0, props.total - discountValue()) }}</h5>
			</div>
			<div class="tw-mt-2 tw-font-bold tw-text-base">
				<div>Grand Total</div>
				<div>{{ formatIDR(grandTotal) }}</div>
			</div>
		</div>
	</BDetailCard>
</template>