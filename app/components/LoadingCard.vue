<template>
  <UiCard class="flex items-center justify-center py-12">
    <div class="flex flex-col items-center gap-4">
      <!-- Spinner personalizado -->
      <div class="relative h-10 w-10">
        <div
          class="absolute inset-0 rounded-full border-4 border-yellow-200"
        ></div>
        <div
          class="absolute inset-0 rounded-full border-4 border-yellow-500 border-t-transparent animate-spin"
        ></div>
      </div>
      <p class="text-gray-500 font-bold">Carregando sugestões...</p>
    </div>
  </UiCard>
</template>

<style>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
