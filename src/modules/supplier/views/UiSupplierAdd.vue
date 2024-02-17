<script setup lang="ts">
import BButton from '@/components/BButton.vue';
import BInputImage from '@/components/BInputImage.vue';
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
      <BInputImage/>
    </div>
    <div class="tw-flex tw-justify-end tw-gap-5">
      <BButton label="Batalkan"></BButton>
      <BButton label="Simpan Pemasok"></BButton>
    </div>
  </form>
</template>