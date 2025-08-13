<script setup lang="ts">
const { send } = useMlProxy();
const route = useRouter();
const search = async () => {
  // const b = await withAuth(async () => ({ path: `/users/me` }));
  const { data, error } = await send(async () => ({ path: `/users/me` }));
  // send<{ a: any }>(async () => ({
  //   path: `/suggestions/user/$USER_ID/items`,
  //   userID: true,
  // }));
  if (error) return console.error(error);
  console.log(data.value);
};

function redirectToLogin() {
  route.push("/login");
}
</script>

<template>
  <div>
    <button @click="redirectToLogin">Login</button>
  </div>
  <div>
    <button @click="search">Buscar Item</button>
  </div>
</template>

<style scoped></style>
