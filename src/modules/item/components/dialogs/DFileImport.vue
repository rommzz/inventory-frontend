<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BDialog from '@/components/BDialog.vue';
import BInputFile from '@/components/BInputFile.vue';
const dialog = defineModel<boolean>()
</script>
<template>
  <BDialog v-model="dialog" title="Impor Barang" :width="512">
    <div class="tw-px-6">
      <p class="tw-mb-4">
        Unggah file barang Anda melalui kotak di bawah ini. Setelah proses unggah selesai, tekan tombol "Impor" untuk mengimpor file tersebut.
      </p>
      <BInputFile class="tw-mx-auto"></BInputFile>
      <div class="tw-flex tw-gap-2 tw-justify-end tw-pt-8 tw-pb-6">
        <BButton label="Batalkan" variant="text" @click="dialog = false"></BButton>
        <BButton label="Impor" />
      </div>
    </div>
  </BDialog>
</template>