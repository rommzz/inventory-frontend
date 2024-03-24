<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BIcon from '@/components/BIcon.vue';
import BSelect from '@/components/BSelect.vue';
import BStepperWindowItem from '@/components/BStepperWindowItem.vue';
import BTextField from '@/components/BTextField.vue';
import DDiscountInput from '@/components/dialogs/DDiscountInput.vue';
import type { BIconName } from '@/components/types/BIcon';
import { formatIDR } from '@/plugin/helpers';
import type { DiscountType } from '@/utils/apis/models/commons';
import type { PurchaseForm } from '@/utils/apis/models/request/purchaseAddRequest';
import moment from 'moment';
import { computed, ref } from 'vue';

const props = defineProps<{
  data: PurchaseForm
}>()
type TaxType = {
  title: string,
  value: DiscountType
}

const taxValueType: TaxType[] = [
  {
    title: 'Persen',
    value: 'percent'
  },
  {
    title: 'Nominal',
    value: 'value'
  }
]

const discountType = ref<DiscountType>()

const emit = defineEmits<{
  (event: 'next', value: {data: PurchaseForm, grandTotal: number}): void,
  (event: 'back'): void,
}>()

const next = () => {
	const asignedData: PurchaseForm = {
		discount: discount.value,
		discountType: discountType.value,
		tax: tax.value,
		taxType: taxType.value.value,
	}
  const nextData = Object.assign(props.data, asignedData)
  emit('next', {
		data: nextData,
		grandTotal: (subtotal.value - discountValue.value) + taxValue.value
	})
}

const purchaseData: {
  icon: BIconName,
  title: string,
  value: string,
}[] = [
  {
    icon: 'person',
    title: 'Pemasok',
    value: props.data.supplier?.company_name ?? ''
  },
  {
    icon: 'calendar_today',
    title: 'Tanggal Pembelian',
    value: moment(props.data?.purchase_date).format('DD MM yyyy')
  }
]

const taxType = ref<TaxType>({
  title: 'Nominal',
  value: 'value'
})

const discountDialog = ref<boolean>(false);

const tax = ref<number>()

const discount = ref<number>()

const newPrice = (newPrice: number, oldPrice: number) => {
  return newPrice - oldPrice
}
const newPriceFormatted = (newPrice: number, oldPrice: number): string => {
  const price = newPrice - oldPrice
  const prefix = (): string => price > 0 ? '+' : '-'
  if (price === 0) {
    return '-'
  }
  return `${prefix()}${formatIDR(Math.abs(price))}`
}

const formattedDiscount = computed(() => {
	if (discount.value != undefined) {
		if (discountType.value == 'percent') {
			return `${discount.value}%`
		} else {
			return formatIDR(discount.value);
		}
	}
	return undefined
})
const subtotal = computed<number>(() => {
	let subtotal: number = 0;
	props.data.items?.forEach(v => { 
		subtotal += (v.price * v.qty)
	})
	return subtotal
})

const percentvalue = (type: DiscountType, value: number, valueOf: number): number => {
	if (type == 'percent') {
		return valueOf * (value / 100)
	} else {
		return value
	}
}

const discountValue = computed(() => percentvalue(discountType.value!, discount.value!, subtotal.value) ?? 0)
const taxValue = computed(() => percentvalue(taxType.value.value!, tax.value!, subtotal.value - discountValue.value) ?? 0)

const discountSummary = computed(() => {
	if (discount.value == undefined) {
		return '-'
	}
	if (discountType.value == 'value') {
		return '-' + formatIDR(discount.value)
	} else {
		return `${discount.value}% (-${formatIDR(subtotal.value * (discount.value / 100))})`
	}
})

const taxSummary = computed(() => {
	if (tax.value == undefined || tax.value == 0) {
		return '-'
	}
	if (taxType.value.value == 'value') {
		return formatIDR(tax.value)
	} else {
		return `${tax.value}% (-${formatIDR((subtotal.value - discountValue.value) * (tax.value / 100))})`
	}
})

const grandTotalSummary = computed<string>(() => {
	return formatIDR((subtotal.value - discountValue.value) + taxValue.value)
})
</script>
<template>
  <BStepperWindowItem title="Data Pembelian">
    <div>
      <div class="tw-grid tw-grid-cols-2 tw-gap-4 tw-mb-5">
        <div v-for="item in purchaseData" :key="item.title" class="tw-flex tw-py-4 tw-px-6 tw-items-center">
          <BIcon :icon="item.icon"></BIcon>
          <div class="tw-ml-4">
            <div class="tw-font-semibold tw-text-xs tw-text-onSurfaceVariant">
              {{ item.title }}
            </div>
            <div class="tw-text-onSurface">
              {{ item.value }}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="tw-font-semibold tw-mb-2">Daftar Barang</div>
        <div class="tw-grid tw-grid-cols-2 tw-gap-3 ">
          <div v-for="item in data.items" :key="item.item.id" class="tw-p-3 tw-rounded-xl tw-border tw-border-outlineVariant tw-bg-surface">
            <div class="tw-text-sm tw-font-semibold tw-text-onSurface tw-mb-2">
              {{ item.item.name }} - {{ item.item.brand.name }}
            </div>
            <div class="tw-grid tw-grid-cols-2 tw-text-xs tw-text-onSurfaceVariant">
              <div>
                <div class="tw-mb-1">
                  Stok Awal: {{ item.item.stock.stock }} {{ item.item.unit.name }}
                </div>
                <div>
                  Stok Akhir: {{ item.qty + item.item.stock.stock }} {{ item.item.unit.name }} ( <span class="tw-text-success">+{{ item.qty }}</span> )
                </div>
              </div>
              <div>
                <div class="tw-mb-1">
                  Harga Barang: {{ formatIDR(item.item.stock.price) }} 
                </div>
                <div>
                  Harga Baru: {{ newPrice(item.price, item.item.stock.price) == 0 ? '-' :  formatIDR(item.price)}}{{ ' ' }}
                  <template v-if="newPrice(item.price, item.item.stock.price) != 0">
                    (<span
                      :class="
                        {
                          'tw-text-success': newPrice(item.price, item.item.stock.price) > 0,
                          'tw-text-danger': newPrice(item.price, item.item.stock.price) < 0,
                        }
                      "
                    >
                      {{ newPriceFormatted(item.price, item.item.stock.price) }}
                    </span>)  
                  </template>
                </div>
              </div>
              <div class="tw-mt-3">
                Total: <span class="tw-font-semibold tw-text-onSurface">{{ formatIDR(item.qty * item.price) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="tw-grid tw-grid-cols-2 tw-gap-5 tw-mt-5">
          <BTextField
            readonly
            @click="discountDialog = true"
            :model-value="formattedDiscount"
            append-inner-icon="navigate_next"
            label="Diskon"
            placeholder="Diskon Pembelian"
          />
          <div class="tw-flex tw-items-end tw-gap-2">
            <BTextField
              class="tw-flex-grow"
              label="Pajak"
              type="number"
              placeholder="Pajak Pembelian"
              v-model.number="tax" 
              :message="taxType.value == 'value' && (tax ?? 0 > 0) ? formatIDR(tax ?? 0) : undefined"
              @update:model-value="v => {
                if (taxType?.value == 'percent') {
                  if (v > 100) {
                    tax = 100
                  }
                }
              }"
            />
            <BSelect
              label=""
              :items="taxValueType"
              :item-title="v => v.title"
              @update:model-value="v => {
                tax = 0;
              }"
              v-model="taxType"
            />
          </div>
        </div>
				<div>
					<h2 class="tw-font-semibold tw-text-onSurface tw-mb-1">Ringkasan</h2>
					<p class="tw-text-sm tw-text-onSurfaceVariant">
						Subtotal: <span class="tw-text-onSurface">{{ formatIDR(subtotal) }}</span> <br>
						Diskon: <span class="tw-text-onSurface">{{ discountSummary }}</span> <br>
						Pajak: <span class="tw-text-onSurface">{{ taxSummary }}</span> <br>
					</p>
					<div class="tw-text-onSurface tw-mt-4">
						Grand Total: <span class="tw-font-semibold">{{ grandTotalSummary }}</span>
					</div>
				</div>
      </div>
    </div>
  </BStepperWindowItem>
  <div class="tw-flex tw-justify-between">
    <BButton
      variant="outlined"
      label="Sebelumnya"
      @click="emit('back')"
    />
    <BButton
      label="Selanjutnya"
      @click="next"
    />
  </div>
  <DDiscountInput
		v-model="discountDialog"
		@submit="v => {
			discount = v.value,
			discountType = v.discountType
			discountDialog = false
		}"
	/>
</template>