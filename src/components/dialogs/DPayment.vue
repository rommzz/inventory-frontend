<script setup lang="ts">
import { paymentMethodlist, type PaymentMethodlist } from '@/plugin/globalVar';
import moment from 'moment';
import { ref } from 'vue';
import BDialog from '../BDialog.vue';
import BInputDate from '../BInputDate.vue';
import BSelect from '../BSelect.vue';
import BTextField from '../BTextField.vue';
import { formatNumber } from '@/plugin/helpers';
import { formatIDR } from '@/plugin/helpers';
import BButton from '../BButton.vue';

const dialog = defineModel<boolean>()

const props = defineProps<{
	remeaningPayment: number
}>()

const paymentMethod = ref<PaymentMethodlist>(paymentMethodlist[0])
const paymentDate = ref<string>(moment().format('yyyy-MM-DD'))

</script>
<template>
	<BDialog v-model="dialog" title="Pembayaran" width="512px">
		<div class="tw-text-onSurface">
			<h2 class="tw-text-2xl tw-mb-4">Data Pembayaran</h2>
			<VForm>
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
				<BTextField
					label="Nominal Pembayaran"
					:model-value="formatNumber(props.remeaningPayment)"
					readonly
				/>
			</VForm>

			<div class="tw-text-base">
				Total Tagihan: <span class="tw-font-semibold">{{ formatIDR(props.remeaningPayment) }}</span>
			</div>
		</div>
		<template v-slot:action>
			<BButton label="Batalkan" variant="text"/>
			<BButton label="Bayar"/>
		</template>
	</BDialog>
</template>