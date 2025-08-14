<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <AppHeaderLogado />

    <!-- Navigation Bar com destaque amarelo -->
    <nav class="bg-white border-b border-gray-200 px-[260px] py-3 shadow-sm">
      <div class="flex justify-between space-x-6">
        <NuxtLink
          to="/price-suggestions"
          class="text-gray-600 hover:text-yellow-500 px-2 py-1 text-sm font-medium transition-colors"
          active-class="text-yellow-600 bg-yellow-50 border-b-2 border-yellow-500 font-semibold"
        >
          Sugestões de Preço
        </NuxtLink>
        <NuxtLink
          to="/sales-analytics"
          class="text-gray-600 hover:text-yellow-500 px-2 py-1 text-sm font-medium transition-colors"
          active-class="text-yellow-600 bg-yellow-50 border-b-2 border-yellow-500 font-semibold"
        >
          Análise de Vendas
        </NuxtLink>
        <NuxtLink
          to="/competitors"
          class="text-gray-600 hover:text-yellow-500 px-2 py-1 text-sm font-medium transition-colors"
          active-class="text-yellow-600 bg-yellow-50 border-b-2 border-yellow-500 font-semibold"
        >
          Concorrentes
        </NuxtLink>
        <NuxtLink
          to="/price-automation"
          class="text-gray-600 hover:text-yellow-500 px-2 py-1 text-sm font-medium transition-colors"
          active-class="text-yellow-600 bg-yellow-50 border-b-2 border-yellow-500 font-semibold"
        >
          Automação
        </NuxtLink>
        <NuxtLink
          to="/reports"
          class="text-gray-600 hover:text-yellow-500 px-2 py-1 text-sm font-medium transition-colors"
          active-class="text-yellow-600 bg-yellow-50 border-b-2 border-yellow-500 font-semibold"
        >
          Relatórios
        </NuxtLink>
      </div>
    </nav>

    <main class="flex-grow flex p-4 py-8 px-[260px]">
      <slot></slot>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// Lógica do componente (se necessário)
</script>

<style scoped>
/* Transição suave para o hover e estado ativo */
.router-link-active {
  transition: all 0.2s ease;
}

/* Efeito de "onda" ao clicar */
.router-link-active:active {
  transform: scale(0.98);
}
</style>
