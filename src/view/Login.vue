<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { apiService } from "@/service/auth"

const error = ref(false);
const loading = ref(false);

const gerarCSRF = async () => {
  const dataCSRF = await apiService.csrf(process.env.VUE_APP_APPLICATION!);
  return dataCSRF.csfr;
}

const login = async () => {
  loading.value = true;
  const csrf = await gerarCSRF();
  if (csrf) {
    const url = `${process.env.VUE_APP_BAUTH}login`;
    const URLSearch = new URLSearchParams({
      csrf,
      url_retorno: process.env.VUE_APP_APPLICATION!,
    });
    window.location.replace(url + "?" + URLSearch.toString());
  } else {
    error.value = true;
  }
  loading.value = false
}

onMounted(() => {
  login();
})
</script>
<template>
  <div class="h-100 d-flex align-center justify-center">
    <div v-if="!error && loading" class="relative" style="width: 70px; height: 70px">
      <div class="absolute">
        <v-progress-circular value="100" class="absolute" color="black" size="70" width="7"></v-progress-circular>
      </div>
      <div class="absolute">
        <v-progress-circular indeterminate class="absolute" color="primary" size="70" width="7"></v-progress-circular>
      </div>
    </div>
  </div>
</template>