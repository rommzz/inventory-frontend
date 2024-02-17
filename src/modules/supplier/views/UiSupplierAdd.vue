<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BIcon from '@/components/BIcon.vue';
import BTextField from '@/components/BTextField.vue';

</script>
<template>
  <form class="tw-bg-white tw-rounded-xl tw-p-5">
    <div class="tw-grid tw-grid-cols-2 tw-gap-x-5">
      <BTextField label="Perusahaan" placeholder="Nama Perusahaan Pemasok"></BTextField>
      <BTextField label="Nama" placeholder="Nama Pemasok"></BTextField>
      <BTextField label="Email" placeholder="Email Pemasok"></BTextField>
      <BTextField label="No. Telephone" type="tel" placeholder="No. Telepon Pemasok"></BTextField>
    </div>
    <BTextField label="Alamat" type="textarea" placeholder="Alamat Pemasok" ></BTextField>
    <div>
      <h5>logo</h5>
      <p>
        Anda dapat mengunggah gambar logo perusahaan pemasok untuk ditampilkan.
      </p>
      <div class="tw-border-2 tw-border-dotted tw-w-36 tw-h-36 tw-border-outline tw-flex tw-place-items-center tw-rounded-xl">
        <div class="tw-text-onSurfaceVariant tw-mx-auto tw-flex tw-items-center tw-gap-1">
          <BIcon icon="upload"></BIcon>
          <span class="tw-text-xs tw-font-semibold">Unggah Foto</span>
        </div>
      </div>
    </div>
    <div class="tw-flex tw-justify-end tw-gap-5">
      <BButton label="Batalkan"></BButton>
      <BButton label="Simpan Pemasok"></BButton>
    </div>
  </form>
</template>