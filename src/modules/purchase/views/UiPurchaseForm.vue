<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import { reactive, ref } from 'vue';
import PurchaseAddItems from '../components/PurchaseAddItems.vue';
import { usePurchaseStore } from '../stores';
import type { PurchaseForm, PurchaseItem } from '@/utils/apis/models/request/purchaseAddRequest';

const props = defineProps<{
  id?: string;
}>();

type Step = {
  step: number,
  caption: string,
}

const step1 = ref(null)

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
const store = usePurchaseStore();
const formField = ref<PurchaseForm>({});
const form = ref();
const isLoading = ref<boolean>(false);
const isEdit = props.id !== undefined;



const submit = async () => {
  const valid = await form.value.validate()
  if (valid) {
    isLoading.value = true;
    isEdit ? updateSupplier() : createSupplier();
    isLoading.value = false;
  }
}

const updateSupplier = () => {
  isLoading.value = true;
  
}

const createSupplier = () => {
  isLoading.value = true;
}

const ha = (e: PurchaseItem[]) => {
  console.log(e);
  formField.value.items = e
  console.log(formField.value);
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
          {{ n.caption }}
        </VStepperItem>
      </template>
    </VStepperHeader>
    <VStepperWindow>
      <VStepperWindowItem>
        <PurchaseAddItems
          ref="step1"
          @update:items="ha"
          v-model:supplier="formField.supplier"
          v-model:purchase-date="formField.purchase_date"
          @next="currentStep++"
        />
      </VStepperWindowItem>
      <VStepperWindowItem>
        cok 2s
      </VStepperWindowItem>
      <VStepperWindowItem>
        step 3
      </VStepperWindowItem>
    </VStepperWindow>
  </VStepper>
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