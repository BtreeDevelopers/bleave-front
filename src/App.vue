<script setup lang="ts"></script>

<template>
  <VApp>
    <VMain class="main-bleave">
      <RouterView></RouterView>
    </VMain>
  </VApp>
</template>

<style>
.main-bleave {
  max-width: 1400px !important;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
</style>
