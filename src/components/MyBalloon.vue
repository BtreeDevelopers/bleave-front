<script setup lang="ts">
import { useDisplay } from "vuetify";

const { mobile } = useDisplay();
</script>

<template>
  <div class="d-flex flex-column align-end">
    <p class="text-subtitle-2 text-gray1 text-end mr-5">09:00</p>

    <div class="balao">
      <div
        class="rounded rounded-te-0 bg-primary pa-2"
        style="min-height: 50px"
        :style="{
          width: mobile ? '240px' : '260px',
        }"
      >
        texto texto
      </div>
      <svg
        width="15"
        height="13"
        viewBox="0 0 15 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.1006 3.61011L3.1864 11.6521C1.86587 12.6251 0 11.6823 0 10.042V2C0 0.895431 0.895432 0 2 0H12.9142C14.8448 0 15.6548 2.46487 14.1006 3.61011Z"
          fill="#5093FE"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.balao {
  display: flex;
}
.borda {
  height: 14px;
  width: 19px;
}
</style>
