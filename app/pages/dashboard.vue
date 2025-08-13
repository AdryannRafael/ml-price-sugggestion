<script setup>
const { withAuth, session } = useSessionAuth();

const products = ref([]);

onMounted(async () => {
  products.value = await withAuth(() => ({
    path: "/sites/MLB/search?q=computador",
    method: "GET",
  }));
});
</script>
