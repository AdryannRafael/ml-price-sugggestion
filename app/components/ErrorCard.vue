<script setup lang="ts">
import { AlertCircle } from "lucide-vue-next";

defineProps({
  title: {
    type: String,
    default: "Error ao conectar com servidor",
  },
  message: {
    type: () => null as string | null,
    required: true,
  },
  details: {
    type: String,
    default: "",
  },
  retryText: {
    type: String,
    default: "Tentar novamente",
  },
});

defineEmits(["retry"]);
</script>
<template>
  <UiCard class="border-red-200 bg-red-50">
    <div class="flex items-start gap-3 p-4">
      <AlertCircle class="h-5 w-5 text-red-500 flex-shrink-0" />
      <div>
        <h3 class="font-medium text-red-800">
          {{ title || "Ocorreu um erro" }}
        </h3>
        <p class="text-sm text-red-600 mt-1">
          {{ message || "Não foi possível completar a operação." }}
        </p>
        <div
          v-if="details"
          class="mt-2 text-xs text-red-500 bg-red-100 p-2 rounded"
        >
          {{ details }}
        </div>
        <UiButton
          v-if="retryText"
          variant="outline"
          class="mt-3 border-red-300 text-red-600 hover:bg-red-100"
          @click="$emit('retry')"
        >
          {{ retryText }}
        </UiButton>
      </div>
    </div>
  </UiCard>
</template>
