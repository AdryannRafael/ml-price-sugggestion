<script lang="ts" setup>
const loginWithML = async () => {
  window.location.href = "/api/auth/login-with-mercadolivre";
};
</script>

<template>
  <button @click="loginWithML">Login com Mercado Livre</button>
</template>
