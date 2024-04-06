<script setup lang="ts">
import type { PurchasePaymentForm as PP } from '@/utils/apis/models/model';
import type { SalesForm } from '@/utils/apis/models/request/salesCreateRequest';
import { ref } from 'vue';
import SaleAddItems from '../components/SaleAddItems.vue';
import SalePayment from '../components/SalePayment.vue';
import SaleReview from '../components/SaleReview.vue';
import DConfirmSale from '../components/dialog/DConfirmSale.vue';

type Step = {
  step: number,
  caption: string,
}
const dialog = ref<boolean>(false)
const currentStep = ref<number>(0)
let grandTotal: number = 0
const step: Step[] = [
  {
    step: 0,
    caption: 'Tambah Barang',
  },
  {
    step: 1,
    caption: 'Review Pembelian',
  },
  {
    step: 2,
    caption: 'Pembayaran',
  },
]


const formField = ref<SalesForm>({});

const submit = async (payment?: PP) => {
	// formField.value.grand_total = grandTotal
	if (payment) {
		formField.value.payments = []
		formField.value.payments.push(payment)
	}
	console.log(formField.value);
	dialog.value = true
}

const next = (data: SalesForm, gt?: number) => {
	if (gt) {
		grandTotal = gt
	}
  Object.assign(formField.value, data)
  currentStep.value++
}

</script>
<template>
  <VStepper
    alt-labels
    id="stepper"
    v-model="currentStep"
    class="elevation-0"
  >
    <VStepperHeader
      class="elevation-0 tw-mb-10 tw-bg-white tw-rounded-md"
    >
      <template v-for="n, index in step" :key="index" >
        <VDivider v-if="index > 0"/>
        <VStepperItem
          class="tw-text-sm"
          :color="n.step == currentStep ? 'primary' : ''"
          :value="n.step"
        >
          <template v-slot:icon="{step}">
						<div>{{ step+1 }}</div>
					</template>
					<template v-slot:default>
						<div>{{ n.caption }}</div>
					</template>
        </VStepperItem>
      </template>
    </VStepperHeader>
    <VStepperWindow>
      <VStepperWindowItem>
        <SaleAddItems
          @next="next"
        />
      </VStepperWindowItem>
      <VStepperWindowItem>
        <SaleReview
          :data="formField"
          @next="v => next(v.data, v.grandTotal)"
          @back="currentStep--"
        />
      </VStepperWindowItem>
      <VStepperWindowItem>
        <SalePayment
					@back="currentStep--"
					:grand-total="grandTotal"
					@next="submit"
				/>
      </VStepperWindowItem>
    </VStepperWindow>
  </VStepper>
	<DConfirmSale
		:data="formField"
		v-model="dialog"
	/>
</template>
<style scoped>
#stepper :deep(.v-stepper-item) {
  padding: 20px;
}
#stepper {  
  background: unset;
}
#stepper :deep(.v-window) {
  background: white;
  border-radius: 8px;
  margin: 0;
  padding: 20px;
}
</style>