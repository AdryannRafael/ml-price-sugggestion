<template>
  <div>Nome do cidadao: {{ r }}</div>
</template>
<script setup>
const { auth } = useAuthMl();
console.log(auth);
const r = ref(auth.value.name);
// onMounted(async () => {
//   products.value = await withAuth(() => ({
//     path: "/sites/MLB/search?q=computador",
//     method: "GET",
//   }));
// });
</script>
