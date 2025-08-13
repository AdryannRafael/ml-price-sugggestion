<template>
  <NuxtPage />
</template>

<script setup>
const { initSession } = useSessionAuth();

// onMounted(() => {
//   // Adicione um pequeno delay para evitar conflito com DevTools
//   setTimeout(() => {
//     initSession();
//   }, 100);
// });
</script>
