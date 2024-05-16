<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BDialog from '@/components/BDialog.vue';
import BTextField from '@/components/BTextField.vue';
import { watch } from 'vue';
import { ref } from 'vue';
const props = defineProps<{
	price: number
}>()
const emit = defineEmits<{
	(e: 'successEdit'): void
}>()
const dialog = defineModel<boolean>()

const newPrice = ref<number>(0)
const loading = ref<boolean>(false)

watch(dialog, newV => {
  if (newV) {
    newPrice.value = props.price
  }
})

const submit = async () => {
	loading.value = true
	setTimeout(() => {
		loading.value = false
		emit('successEdit')
	}, 1000);
}

</script>
<template>
	<BDialog
		v-model="dialog"
		title="Edit Harga Barang"
		:persistent="loading"
	>
		<div>
			<BTextField label="Harga Barang" type="number" v-model="newPrice"></BTextField>
		</div>
		<template v-slot:action>
			<BButton :disabled="loading" label="Batalkan" variant="outlined"></BButton>
			<BButton :is-loading="loading" label="Simpan" @click="submit"></BButton>
		</template>
	</BDialog>
</template>