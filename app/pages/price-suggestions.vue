<script setup lang="ts">
import { Target } from "lucide-vue-next";
import type { DetailItemOutput } from "~/dto/output/detail-item.output";
import type { PageOutput } from "~/dto/output/page-ml.output";

const { send } = useMlProxy();
const products = ref<DetailItemOutput[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const findProductsToSuggestion = async () => {
  try {
    loading.value = true;
    error.value = null;

    // Busca IDs dos produtos
    const res = await send<PageOutput<string>>({
      // path: "/users/$USER_ID/items/search",
      path: "/suggestions/user/$USER_ID/items",
      userID: true,
    });
    const { info: itemsResponse, error: itemsError } = res;
    console.log(res);
    if (itemsError) {
      if (itemsError.statusCode != 404) {
        error.value = itemsError.message;
      }
      console.log(res);
      return;
    }

    // Busca detalhes de cada produto em paralelo
    await Promise.all(
      itemsResponse.results.map(async (itemID) => {
        const { info: details, error: detailError } =
          await send<DetailItemOutput>({
            path: `/items/${itemID}`,
          });
        if (detailError) {
          error.value = detailError.message;
          return;
        }
        products.value.push(details);
      })
    );
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// Carrega os produtos quando o componente é montado
findProductsToSuggestion();
</script>

<template>
  <template v-if="loading">
    <LoadingCard />
  </template>

  <template v-else>
    <template v-if="error">
      <ErrorCard :message="error" />
    </template>
    <template v-else>
      <NotFoundCard
        v-if="!products.length"
        title="Sugestões indisponíveis"
        msg="Não encontramos sugestões de preço para seus itens no momento."
        labelBtnReload="Recarregar sugestões"
        @reload="findProductsToSuggestion"
      />

      <UiCard v-else>
        <UiCardHeader>
          <UiCardTitle class="flex items-center gap-2">
            <Target class="h-5 w-5" />
            Itens com Sugestões Encontrados ({{ products.length }})
          </UiCardTitle>
        </UiCardHeader>

        <UiCardContent>
          <div class="space-y-3">
            <div
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
              <UiButton class="bg-black text-white" size="sm">
                Ver Sugestões
              </UiButton>
            </div>
          </div>
        </UiCardContent>
      </UiCard>
    </template>
  </template>
</template>
