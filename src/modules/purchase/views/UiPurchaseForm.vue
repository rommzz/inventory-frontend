<script setup lang="ts">
import type { PurchasePayment as PP, PurchaseForm } from '@/utils/apis/models/request/purchaseAddRequest';
import { computed, ref } from 'vue';
import PurchaseAddItems from '../components/PurchaseAddItems.vue';
import PurchasePayment from '../components/PurchasePayment.vue';
import PurchaseReview from '../components/PurchaseReview.vue';
import DConfirmPurchase from '../components/dialog/DConfirmPurchase.vue';


type Step = {
  step: number,
  caption: string,
}

const dialog = ref<boolean>(false)

const grandTotal = computed<number>(() => {
	let gt = 0;
	formField.value.items?.forEach(item => {
		gt += (item.price * item.qty)
	})
	return gt;
})

const currentStep = ref<number>(0)

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

const formField = ref<PurchaseForm>({});

const submit = async (payment: PP) => {
  formField.value.payments = []
	formField.value.payments.push(payment)
	dialog.value = true
}

const next = (data: PurchaseForm) => {
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
        <PurchaseAddItems
          @next="next"
        />
      </VStepperWindowItem>
      <VStepperWindowItem>
        <PurchaseReview
          :data="formField"
          @next="next"
          @back="currentStep--"
        />
      </VStepperWindowItem>
      <VStepperWindowItem>
        <PurchasePayment
					@back="currentStep--"
					:grand-total="grandTotal"
					@next="submit"
				/>
      </VStepperWindowItem>
    </VStepperWindow>
  </VStepper>
	<DConfirmPurchase
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