<script setup lang="ts">
import { AlertTriangle, RefreshCw } from "lucide-vue-next";

const { labelBtnReload, msg, title } = defineProps<{
  title: string;
  msg: string;
  labelBtnReload: string;
}>();
</script>

<template>
  <UiCard class="text-center py-10 bg-orange-50 border-orange-100">
    <div class="flex flex-col items-center gap-5 px-6 py-8">
      <!-- Ícone com círculo laranja -->
      <div class="bg-orange-100 p-3 rounded-full">
        <AlertTriangle class="w-8 h-8 text-orange-600" />
      </div>

      <!-- Título com gradiente laranja -->
      <h3
        class="text-xl font-semibold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent"
      >
        {{ title }}
      </h3>

      <!-- Texto descritivo -->
      <p class="text-orange-800/80 max-w-md">
        {{ msg }}
        <!-- <span class="block mt-1 text-sm text-orange-700/60"
          >Verifique novamente mais tarde ou tente recarregar.</span
        > -->
      </p>

      <!-- Botão com tema laranja -->
      <UiButton
        class="mt-4 bg-orange-500 hover:bg-orange-600 text-white shadow-orange-200 hover:shadow-orange-300 transition-all"
      >
        <RefreshCw class="w-4 h-4 mr-2 animate-spin-on-hover" />
        {{ labelBtnReload }}
      </UiButton>
    </div>
  </UiCard>
</template>

<style scoped></style>
