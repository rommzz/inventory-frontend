<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BDialog from '@/components/BDialog.vue';
import BIcon from '@/components/BIcon.vue';
import { ref } from 'vue';

const props =  defineProps<{
	onImport(file: File): Promise<void>
	loading?: boolean
}>()

const file = ref<File>()

const dialog = defineModel<boolean>()

const importState = ref<'idle' | 'importing' | 'success' | 'failed'>('idle')
const inputImage = ref<HTMLInputElement | null>(null)
const onChangeFile = () => {
  file.value = inputImage.value?.files?.[0]
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
				:class="{
					'tw-border-primary': importState == 'importing',
					'tw-border-success': importState == 'success',
				}"
				@click="inputImage?.click()"
			>
				<div class="tw-text-onSurfaceVariant tw-flex tw-gap-1 tw-overflow-hidden tw-items-center tw-p-3 tw-w-full">
					<template v-if="importState == 'importing'">
						<VProgressCircular indeterminate color="primary"/>
						<span class="tw-text-xs tw-font-semibold">Proses Mengupload File...</span>
					</template>
					<template v-else>
						<template v-if="importState == 'success'">
							<BIcon icon="check_circle" color="success"/>
							<span class="tw-text-xs tw-font-semibold">Proses Upload Berhasil</span>
						</template>
						<template v-if="importState == 'idle'">
							<BIcon icon="upload"></BIcon>
							<span class="tw-text-xs tw-font-semibold">{{ file?.name ?? 'Unggah File' }}</span>
							<input
								type="file"
								accept=".xls,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.xlsx,application/vnd.ms-excel.sheet.binary.macroEnabled.12"
								v-show="false"
								ref="inputImage"
								@change="onChangeFile()"
							>
							<VSpacer></VSpacer>
							<BIcon v-if="file" icon="dangerous" color="error" class="tw-cursor-pointer" @click.stop="() => {
								file = undefined
							}"></BIcon>
						</template>
					</template>
				</div>
			</div>
      <div class="tw-flex tw-gap-2 tw-justify-end tw-pt-8 tw-pb-6">
				<template v-if="!(importState == 'success')" >
					<BButton label="Batalkan" variant="text" @click="dialog = false" :disabled="importState == 'importing'"></BButton>
					<BButton
						label="Impor"
						@click="() => {
							onImport(file!).then(() => {
								console.log('sukses coy');
								importState = 'success'
							}).catch(e => console.log(e))
						}"
						:disabled="importState == 'importing'"
					/>
				</template>
				<BButton v-else label="Selesai" @click="() => {
					dialog = false
					importState = 'idle'
				}"></BButton>
      </div>
    </div>
  </BDialog>
</template>