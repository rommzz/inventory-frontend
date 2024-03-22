<script setup lang="ts">
import { formatIDR } from '@/plugin/helpers';
import type { DiscountType } from '@/utils/apis/models/commons';
import { ref } from 'vue';
import BButton from '../BButton.vue';
import BDialog from '../BDialog.vue';
import BSelect from '../BSelect.vue';
import BTextField from '../BTextField.vue';
import { onMounted } from 'vue';

onMounted(() => {
	discountType.value = discountTypeList.find(v => v.value == props.discountTypeProp) ?? discountTypeList[0]
	if (discountType.value.value == 'percent') {
		discountPercent.value = props.value
	} else {
		discount.value = props.value;
	}
})

const props = defineProps<{
	discountTypeProp?: DiscountType,
	value?: number
}>()

type Discount = {
	title: string,
	value: DiscountType,
}

const discountTypeList: Discount[] = [
	{
		title: 'persen',
		value: 'percent',
	},
	{
		title: 'nominal',
		value: 'value',
	}
]

const emit = defineEmits<{
	(e: 'submit', discount: {
		value: number,
		discountType: DiscountType
	}): void
}>()

const listPercent: number[] = [ 10, 15, 20, 25, 30, 35, 40, 45, 50 ]
const selectedPercent = ref<number>()
const discountType = ref<Discount>(discountTypeList[0])
const discount = ref<number>()
const discountPercent = ref<number>()
const dialog = defineModel<boolean>()
</script>
<template>
  <BDialog
    v-model="dialog"
    title="Tambah Diskon"
		width="512"
  >
    <div>
      <div class="tw-flex tw-gap-1">
        <BTextField
					class="tw-flex-grow"
          label=""
          placeholder="Diskon"
          v-model.number="discountPercent"
					@update:model-value="v =>  {
						selectedPercent = undefined
						discountPercent = parseFloat(v) > 100 ? 100 : v
					}"
					hide-details
					v-if="discountType.value == 'percent'"
        />
				<BTextField
					v-else
					class="tw-flex-grow"
          label=""
          placeholder="Diskon"
          v-model.number="discount"
					:message="discount != undefined ? formatIDR(discount) : undefined"
        />
				<BSelect
					class="tw-w-44"
					label=""
					:items="discountTypeList"
					:item-title="v => v.title"
					v-model="discountType"
					@update:model-value="() => {
						discount = undefined
						selectedPercent == null
					}"
					hide-details
				/>
      </div>
			<template v-if="discountType.value == 'percent'">
				<p class="tw-mb-4 tw-mt-2 tw-text-sm tw-text-onSurfaceVariant">
					Masukkan diskon persen pada field di atas, atau pilih nominal persen dari salah satu chip di bawah ini. 
				</p>
				<div class="tw-flex tw-flex-wrap tw-gap-4">
					<span
						style="width: 61px;"
						v-for="item in listPercent"
						:key="item"
						class="tw-rounded-lg tw-border-outline tw-max-w-14 tw-text-center	tw-py-2 tw-px-4 tw-cursor-pointer tw-font-semibold tw-text-sm"
						:class="`${selectedPercent == item ? 'tw-bg-primary tw-text-white' : 'tw-bg-white tw-border'}`"
						@click="() => {
							selectedPercent = item
							discountPercent = item
						}"
					>
						{{ item }}%
					</span>
				</div>
			</template>
    </div>
		<template v-slot:action>
			<BButton variant="text" label="Batalkan" @click="dialog = false"></BButton>
			<BButton label="Tambah" @click="emit('submit', {
				value: discountType.value == 'percent' ? discountPercent! : discount!,
				discountType: discountType.value
			})"></BButton>
		</template>
  </BDialog>
</template>