<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BDialog from '@/components/BDialog.vue';
import BInputFile from '@/components/BInputFile.vue';
import { ref } from 'vue';

const props =  defineProps<{
	onImport(file: any): void
	loading?: boolean
}>()

const file = ref()

const dialog = defineModel<boolean>()
</script>
<template>
  <BDialog v-model="dialog" title="Impor Barang" :width="512">
    <div>
      <p class="tw-mb-4">
        Unggah file barang Anda melalui kotak di bawah ini. Setelah proses unggah selesai, tekan tombol "Impor" untuk mengimpor file tersebut.
      </p>
      <BInputFile
				v-model="file"
				class="tw-mx-auto"
				accept=".xls,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.xlsx,application/vnd.ms-excel.sheet.binary.macroEnabled.12"
			/>
      <div class="tw-flex tw-gap-2 tw-justify-end tw-pt-8 tw-pb-6">
        <BButton label="Batalkan" variant="text" @click="dialog = false"></BButton>
        <BButton label="Impor" @click="() => onImport(file)" :is-loading="loading"/>
      </div>
    </div>
  </BDialog>
</template>