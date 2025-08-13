<template>
  <div>
    <button @click="search">Buscar Item</button>
  </div>
</template>

<script setup lang="ts">
const { send } = useMlProxy();
const search = async () => {
  // const b = await withAuth(async () => ({ path: `/users/me` }));
  const { data } = await send<{ a: any }>(async () => ({
    path: `/suggestions/user/$USER_ID/items`,
    userID: true,
  }));
  console.log(data);
};
</script>

<style scoped></style>
