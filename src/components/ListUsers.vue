<script setup lang="ts">
import PreviewChat from "./PreviewChat.vue";
</script>

<template>
  <p class="text-h5 font-weight-bold ml-6 my-5">Conversas</p>
  <VTextField
    variant="solo"
    bg-color="background"
    prepend-inner-icon="$MagnifyingGlassIcon"
    class="mb-5"
  ></VTextField>
  <div class="overflow-auto">
    <PreviewChat v-for="n in 20" :key="n" :selected="n === 2"></PreviewChat>
  </div>
</template>

<style scoped lang="scss"></style>
