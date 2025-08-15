<script setup lang="ts">
const { query } = useRoute();
const nameProduct = query?.name;
const id = query?.item;
</script>
<template>
  <Page>
    <UiCard>
      <UiCardHeader>
        <UiCardTitle class="flex items-center gap-2">
          <Target class="h-5 w-5" />
          Análise de preço para <span class="font-bold">{{ nameProduct }}</span>
        </UiCardTitle>
      </UiCardHeader>

      <UiCardContent>
        <div class="space-y-3">
          <!-- <div
            v-for="(product, i) in products"
            :key="product.id"
            class="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"
              >
                <span class="text-sm font-medium text-blue-600">{{
                  i + 1
                }}</span>
              </div>
              <img
                :src="product.thumbnail"
                :alt="product.title"
                class="w-10 h-10 object-contain"
              />
              <div>
                <p class="font-medium text-gray-900 line-clamp-1">
                  {{ product.title }}
                </p>
                <p class="text-sm text-gray-600">ID: {{ product.id }}</p>
              </div>
            </div>
            <UiButton
              class="bg-black text-white"
              size="sm"
              @click="redirectToAnalysisPage(product)"
            >
              Ver Sugestões
            </UiButton>
          </div> -->
        </div>
      </UiCardContent>
    </UiCard>
  </Page>
</template>

<style scoped></style>
