<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BDialog from '@/components/BDialog.vue';
import BIcon from '@/components/BIcon.vue';
import { ref } from 'vue';

const props =  defineProps<{
	onImport(file: any): Promise<void>
	loading?: boolean
}>()

const file = ref()

const dialog = defineModel<boolean>()
const modelFile = ref<string | null>()

const isSuccess = ref<boolean>(false)
const fileName = ref<string>()
const inputImage = ref<HTMLInputElement | null>(null)
const onChangeFile = () => {
  const file = inputImage.value?.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      modelFile.value = e.target?.result as string
			fileName.value = file.name
    }
    reader.readAsDataURL(file)
  }
}
</script>
<template>
  <BDialog v-model="dialog" title="Impor Barang" :width="512">
    <div>
      <p class="tw-mb-4">
        Unggah file barang Anda melalui kotak di bawah ini. Setelah proses unggah selesai, tekan tombol "Impor" untuk mengimpor file tersebut.
      </p>
			<div
				class="tw-mx-auto tw-border-2 tw-border-dotted tw-border-outline tw-flex tw-rounded-xl hover:tw-cursor-pointer tw-relative"
				@click="inputImage?.click()"
			>
				<div class="tw-text-onSurfaceVariant tw-flex tw-gap-1 tw-overflow-hidden tw-items-center tw-p-3">
					<template v-if="loading">
						<VProgressCircular indeterminate color="primary"/>
						<span class="tw-text-xs tw-font-semibold">Proses Mengupload File...</span>
					</template>
					<template v-else>
						<BIcon icon="upload"></BIcon>
						<span class="tw-text-xs tw-font-semibold">{{ modelFile ? fileName : 'Unggah File' }}</span>
						<input
							type="file"
							accept=".xls,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.xlsx,application/vnd.ms-excel.sheet.binary.macroEnabled.12"
							v-show="false"
							ref="inputImage"
							@change="onChangeFile()"
						>
						<VSpacer></VSpacer>
						<BIcon v-if="modelFile" icon="dangerous" color="error" class="tw-cursor-pointer" @click.stop="() => {
							modelFile = null
							fileName = ''
						}"></BIcon>
					</template>
				</div>
			</div>
      <div class="tw-flex tw-gap-2 tw-justify-end tw-pt-8 tw-pb-6">
				<template v-if="!isSuccess" >
					<BButton label="Batalkan" variant="text" @click="dialog = false" :disabled="loading"></BButton>
					<BButton
						label="Impor"
						@click="() => onImport(file).then(() => isSuccess = true)"
						:disabled="loading"
					/>
				</template>
				<BButton v-else label="Selesai" @click="() => {
					dialog = false
					isSuccess = false
				}"></BButton>
      </div>
    </div>
  </BDialog>
</template>