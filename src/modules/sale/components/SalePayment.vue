<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BInputDate from '@/components/BInputDate.vue';
import BSelect from '@/components/BSelect.vue';
import BStepperWindowItem from '@/components/BStepperWindowItem.vue';
import BTextField from '@/components/BTextField.vue';
import type { PaymentMethodlist } from "@/plugin/globalVar";
import { paymentMethodlist } from "@/plugin/globalVar";
import { formatIDR } from '@/plugin/helpers';
import type { PurchasePaymentForm } from '@/utils/apis/models/model';
import moment from 'moment';
import { ref } from 'vue';

const props = defineProps<{
	grandTotal: number
}>()

const form = ref();

const paymentMethod = ref<PaymentMethodlist>(paymentMethodlist[0])
const paymentDate = ref<string>(moment().format('yyyy-MM-DD'))
const amount = ref<number>()

const submit = async (withoutPayment: boolean = false) => {
	if (withoutPayment) {
		emit('next')
		return;
	}
	const valid = await form.value.validate()
  if (valid.valid) {
		console.log('valid');
		
    emit('next', {
      amount: amount.value,
			payment_date: paymentDate.value,
			payment_method: paymentMethod.value.value,
    });
  }
}

const emit = defineEmits<{
	(e: 'back'): void
	(e: 'next', value?: PurchasePaymentForm): void
}>()
</script>
<template>
	<div>
		<BStepperWindowItem title="Data Pembayaran">
			<VForm ref="form">
				<div class="tw-grid tw-grid-cols-2 tw-gap-2">
					<BSelect
						label="Metode Pembayaran"
						:items="paymentMethodlist"
						:item-title="v => v.title"
						v-model="paymentMethod"
					/>
					<BInputDate
						label="Tanggal Pembayaran"
						v-model="paymentDate"
						:max-date="moment().format('yyyy-MM-DD')"
					/>
				</div>
				<BTextField
					label="Nominal Pembayaran"
					placeholder="Masukkan Nominal Pembayaran"
					type="number"
					v-model.number="amount"
					:message="amount ? formatIDR(amount) : undefined"
					@update:model-value="v => {
						amount = v > grandTotal ? grandTotal : v
					}"
					:rules="[ v => !!v || 'Nominal Pembayaran Wajib Diisi', ]"
				>
					<template v-slot:altMessage>
						<div>
							<span
								class="tw-p-2 tw-text-primary tw-cursor-pointer tw-font-semibold tw-text-sm"
								v-ripple
								@click="() =>{amount = grandTotal}"
							>
								Bayar Sesuai Tagihan
							</span>
						</div>
					</template>
				</BTextField>
			</VForm>
			<div class="tw-text-onSurface">
				Total Tagihan <span class="tw-font-semibold">{{ formatIDR(props.grandTotal) }}</span>
			</div>
		</BStepperWindowItem>
		<div class="tw-flex tw-justify-between">
			<BButton
				variant="outlined"
				label="Sebelumnya"
				@click="emit('back')"
			/>
			<div>
				<BButton
					variant="outlined"
					label="Selesaikan Tanpa Pembayaran"
					@click="submit(true)"
					class="tw-mr-5"
				/>
				<BButton
					label="Selesaikan"
					@click="submit"
				/>
			</div>
		</div>
	</div>
</template>