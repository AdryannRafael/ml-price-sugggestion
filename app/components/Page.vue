<script setup lang="ts">
import { watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// Forçar a reatividade do layout
watch(
  () => route.path,
  () => {
    setPageLayout("system");
  },
  { immediate: true }
);
</script>
<template>
  <slot></slot>
</template>

<style scoped></style>
