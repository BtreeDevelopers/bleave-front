<script setup lang="ts">
import ListUsers from "@/components/ListUsers.vue";
import Chat from "@/components/Chat.vue";
import { useDisplay } from "vuetify";

const { mobile } = useDisplay();
</script>

<template>
  <VContainer fluid class="h-screen">
    <VRow class="h-100" style="margin: 0">
      <VCol
        cols="4"
        v-if="!mobile"
        class="pa-0 bg-background2 d-flex flex-column"
        style="max-height: 100%"
      >
        <ListUsers></ListUsers>
      </VCol>
      <VCol class="pa-0 d-flex flex-column" style="max-height: 100%">
        <Chat></Chat>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped lang="scss"></style>
