<script setup lang="ts">
import { useDisplay } from "vuetify";

const { mobile } = useDisplay();
</script>

<template>
  <div>
    <p class="text-subtitle-2 text-gray1 ml-16">09:00</p>
    <div class="d-flex">
      <img
        width="40px"
        height="40px"
        class="rounded-circle mr-2"
        src="https://storage.googleapis.com/btreeauth.appspot.com/64a6b96210e294a1c7cd736c.jpg"
      />
      <div class="balao">
        <svg
          width="15"
          height="13"
          viewBox="0 0 15 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.89944 3.61011L11.8136 11.6521C13.1341 12.6251 15 11.6823 15 10.042V2C15 0.895431 14.1046 0 13 0H2.08584C0.155213 0 -0.654819 2.46487 0.89944 3.61011Z"
            fill="#252831"
          />
        </svg>

        <div
          class="rounded rounded-ts-0 bg-background2 pa-2"
          style="min-height: 50px"
          :style="{
            width: mobile ? '240px' : '260px',
          }"
        >
          texto texto
        </div>
      </div>
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
