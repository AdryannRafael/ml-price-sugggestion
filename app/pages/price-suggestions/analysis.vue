<script setup lang="ts">
import {
  DollarSign,
  Percent,
  ShoppingCart,
  Target,
  Users,
  Zap,
  TrendingUp,
  CheckCircle,
  TrendingDown,
  Info,
  Calendar,
} from "lucide-vue-next";
import type { SuggestionOutput } from "~/dto/output/suggestion.output";
import { mockData } from "~/lib/mock";

const { send } = useMlProxy();
const { query } = useRoute();
const router = useRouter();
const nameProduct = query?.name;
const id = query?.item;
const loading = ref(true);
const error = ref<string | null>("");

const suggestionData = ref<SuggestionOutput | null>(null);
const suggestion = computed(() => {
  return suggestionData.value!;
});

const detailSuggestion = async () => {
  if (!id) {
    return router.back();
  }
  try {
    loading.value = true;
    error.value = null;

    const path = `/suggestions/user/${id}/items`;
    // Busca IDs dos produtos
    const res = await send<SuggestionOutput>({
      // path: "/users/$USER_ID/items/search",
      path: path,
    });
    const { info: itemsResponse, error: itemsError } = res;
    console.log(res);
    if (itemsError) {
      if (itemsError.statusCode != 404) {
        error.value = itemsError.message;
      }
      console.log(res);
      return router.back();
    }
    suggestionData.value = itemsResponse;
  } catch (err) {
    console.error(err);
    return router.back();
  } finally {
    loading.value = false;
  }
};
// Métodos auxiliares
const statusInfo = computed(() => getStatusInfo(suggestion.value.status));

const getStatusInfo = (status: any) => {
  const statusMap = {
    with_benchmark_highest: {
      label: "Preço Muito Alto",
      description:
        "Seu preço está mais alto que o sugerido e que seus concorrentes",
      color: "bg-red-100 text-red-800 border-red-200",
      icon: `<TrendingUp className="h-4 w-4 text-red-600" />`,
      recommendation: "Considere reduzir o preço para ser mais competitivo",
    },
    with_benchmark_high: {
      label: "Preço Alto",
      description: "Seu preço está alto em relação ao sugerido",
      color: "bg-orange-100 text-orange-800 border-orange-200",
      icon: `<TrendingUp className="h-4 w-4 text-orange-600" />`,
      recommendation: "Avalie reduzir o preço para aumentar as vendas",
    },
    no_benchmark_ok: {
      label: "Preço Ideal",
      description: "Seu preço está igual ao sugerido",
      color: "bg-green-100 text-green-800 border-green-200",
      icon: `<CheckCircle className="h-4 w-4 text-green-600" />`,
      recommendation: "Preço competitivo, mantenha assim",
    },
    no_benchmark_lowest: {
      label: "Preço Baixo",
      description: "Seu preço está abaixo do sugerido",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: `TrendingDown`,
      recommendation: "Você pode aumentar o preço para maximizar lucros",
    },
    not_optin_applied: {
      label: "Promoção Não Aplicada",
      description: "A promoção não foi aplicada",
      color: "bg-gray-100 text-gray-800 border-gray-200",
      icon: `<Info className="h-4 w-4 text-gray-600" />`,
      recommendation: "Considere ativar a promoção sugerida",
    },
    promotion_scheduled: {
      label: "Promoção Agendada",
      description: "Promoção foi programada mas ainda não iniciou",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      icon: `<Calendar className="h-4 w-4 text-yellow-600" />`,
      recommendation: "Aguarde o início da promoção",
    },
    promotion_active: {
      label: "Promoção Ativa",
      description: "Promoção está ativa no período programado",
      color: "bg-purple-100 text-purple-800 border-purple-200",
      icon: `<Percent className="h-4 w-4 text-purple-600" />`,
      recommendation: "Promoção em andamento, monitore os resultados",
    },
  };

  return (
    statusMap[status as keyof typeof statusMap] || {
      label: "Status Desconhecido",
      description: "Status não reconhecido",
      color: "bg-gray-100 text-gray-800 border-gray-200",
      icon: `<AlertTriangle className="h-4 w-4 text-gray-600" />`,
      recommendation: "Verifique o status do item",
    }
  );
};

const formatPrice = (amount: any, currency: any) => {
  // Implemente sua formatação de preço
  return amount;
};

const formatDate = (dateString: any) => {
  // Implemente sua formatação de data
  return dateString;
};

const getCompetitiveness = (competitor: any) => {
  return competitor.info.sold_quantity > 50
    ? "high"
    : competitor.info.sold_quantity > 10
    ? "medium"
    : "low";
};

const getPriceComparison = (competitor: any) => {
  return competitor.price.amount > suggestion.value.current_price.amount
    ? "higher"
    : competitor.price.amount < suggestion.value.current_price.amount
    ? "lower"
    : "equal";
};

const getAverageCompetitorPrice = () => {
  return (
    suggestion.value.metadata.graph.reduce(
      (sum, item) => sum + item.price.amount,
      0
    ) / suggestion.value.metadata.graph.length
  );
};

const getAverageSoldQuantity = () => {
  return (
    suggestion.value.metadata.graph.reduce(
      (sum, item) => sum + item.info.sold_quantity,
      0
    ) / suggestion.value.metadata.graph.length
  );
};

const getCompetitivePosition = () => {
  const avgPrice = getAverageCompetitorPrice();
  return suggestion.value.current_price.amount < avgPrice
    ? "🏆 Competitivo"
    : "⚠️ Acima da média";
};

const getCurrentProfit = () => {
  return (
    suggestion.value.current_price.amount -
    suggestion.value.costs.selling_fees -
    suggestion.value.costs.shipping_fees
  );
};

const getSuggestedProfit = () => {
  return (
    suggestion.value.suggested_price.amount -
    suggestion.value.costs.selling_fees -
    suggestion.value.costs.shipping_fees
  );
};

const getUnhealthyReason = () => {
  return suggestion.value.promotion_detail.unhealthy_reason === "no_sales"
    ? "Sem vendas"
    : suggestion.value.promotion_detail.unhealthy_reason;
};

detailSuggestion();
</script>
<template>
  <Page>
    <template v-if="loading">
      <LoadingCard />
    </template>
    <template v-else>
      <UiCard>
        <UiCardHeader>
          <UiCardTitle class="flex items-center gap-2">
            <Target class="h-5 w-5" />
            Análise de preço para
            <span class="font-bold">{{ nameProduct }}</span>
          </UiCardTitle>
        </UiCardHeader>

        <UiCardContent>
          <div class="space-y-3">
            <div class="space-y-6">
              <!-- Status Card -->
              <UiCard>
                <UiCardHeader>
                  <UiCardTitle class="flex items-center gap-2">
                    <DollarSign class="h-5 w-5" />
                    Status da Precificação
                  </UiCardTitle>
                </UiCardHeader>
                <UiCardContent>
                  <div :class="`p-4 rounded-lg border ${statusInfo.color}`">
                    <div class="flex items-center gap-3 mb-3">
                      <!-- <component :is="statusInfo.icon" /> -->
                      <!-- {{ statusInfo.icon }} -->
                      <div>
                        <h3 class="font-semibold text-lg">
                          {{ statusInfo.label }}
                        </h3>
                        <p class="text-sm opacity-90">
                          {{ statusInfo.description }}
                        </p>
                      </div>
                    </div>
                    <div class="bg-white/50 p-3 rounded border">
                      <p class="text-sm font-medium">💡 Recomendação:</p>
                      <p class="text-sm">{{ statusInfo.recommendation }}</p>
                    </div>
                  </div>
                </UiCardContent>
              </UiCard>

              <!-- Price Analysis -->
              <UiCard>
                <UiCardHeader>
                  <UiCardTitle>Análise de Preços e Progressão</UiCardTitle>
                </UiCardHeader>
                <UiCardContent>
                  <!-- Price Progression Bar -->
                  <div class="mb-6">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm font-medium"
                        >Progressão de Preços</span
                      >
                      <span class="text-xs text-gray-500"
                        >Menor → Atual → Sugerido</span
                      >
                    </div>

                    <div class="relative">
                      <div
                        class="w-full h-8 bg-gray-200 rounded-lg relative overflow-hidden"
                      >
                        <div
                          class="absolute left-0 top-0 h-full bg-green-400 flex items-center justify-center text-white text-xs font-medium"
                          style="width: 33.33%"
                        >
                          Mínimo
                        </div>

                        <div
                          class="absolute top-0 h-full flex items-center justify-center text-white text-xs font-medium"
                          :style="{
                            left: '33.33%',
                            width: '33.33%',
                            backgroundColor:
                              suggestion.current_price.amount >
                              suggestion.suggested_price.amount
                                ? '#ef4444'
                                : '#3b82f6',
                          }"
                        >
                          Atual
                        </div>

                        <div
                          class="absolute right-0 top-0 h-full bg-blue-400 flex items-center justify-center text-white text-xs font-medium"
                          style="width: 33.33%"
                        >
                          Sugerido
                        </div>
                      </div>

                      <div class="flex justify-between mt-2 text-sm">
                        <div class="text-center">
                          <div class="font-bold text-green-700">
                            {{
                              formatPrice(
                                suggestion.lowest_price.amount,
                                suggestion.currency_id
                              )
                            }}
                          </div>
                          <div class="text-xs text-gray-600">Preço Mínimo</div>
                        </div>

                        <div class="text-center">
                          <div
                            :class="`font-bold ${
                              suggestion.current_price.amount >
                              suggestion.suggested_price.amount
                                ? 'text-red-700'
                                : 'text-blue-700'
                            }`"
                          >
                            {{
                              formatPrice(
                                suggestion.current_price.amount,
                                suggestion.currency_id
                              )
                            }}
                          </div>
                          <div class="text-xs text-gray-600">Preço Atual</div>
                        </div>

                        <div class="text-center">
                          <div class="font-bold text-blue-700">
                            {{
                              formatPrice(
                                suggestion.suggested_price.amount,
                                suggestion.currency_id
                              )
                            }}
                          </div>
                          <div class="text-xs text-gray-600">
                            Preço Sugerido
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Impact Analysis -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      class="p-4 bg-yellow-50 rounded-lg border border-yellow-200"
                    >
                      <div class="flex items-center justify-between mb-2">
                        <span class="font-medium text-yellow-800"
                          >Diferença Percentual:</span
                        >
                        <UiBadge
                          :variant="
                            suggestion.percent_difference > 0
                              ? 'destructive'
                              : suggestion.percent_difference < 0
                              ? 'default'
                              : 'secondary'
                          "
                        >
                          {{ suggestion.percent_difference > 0 ? "+" : ""
                          }}{{ suggestion.percent_difference }}%
                        </UiBadge>
                      </div>
                      <p class="text-sm text-yellow-700">
                        {{
                          suggestion.percent_difference > 0
                            ? "Seu preço está acima do sugerido"
                            : suggestion.percent_difference < 0
                            ? "Seu preço está abaixo do sugerido"
                            : "Seu preço está no ponto ideal"
                        }}
                      </p>
                    </div>

                    <div
                      class="p-4 bg-purple-50 rounded-lg border border-purple-200"
                    >
                      <div class="flex items-center justify-between mb-2">
                        <span class="font-medium text-purple-800"
                          >Sugestão Aplicável:</span
                        >
                        <UiBadge
                          :variant="
                            suggestion.applicable_suggestion
                              ? 'default'
                              : 'secondary'
                          "
                        >
                          {{ suggestion.applicable_suggestion ? "Sim" : "Não" }}
                        </UiBadge>
                      </div>
                      <p class="text-sm text-purple-700">
                        {{
                          suggestion.applicable_suggestion
                            ? "Recomendamos aplicar esta sugestão"
                            : "Esta sugestão pode não ser adequada no momento"
                        }}
                      </p>
                    </div>
                  </div>
                </UiCardContent>
              </UiCard>

              <!-- Competitors Analysis - DESTACADO -->
              <UiCard class="border-2 border-orange-200 bg-orange-50">
                <UiCardHeader>
                  <UiCardTitle class="flex items-center gap-2 text-orange-900">
                    <Target class="h-5 w-5" />
                    🏆 Análise da Concorrência - Produtos Competindo com o Seu
                  </UiCardTitle>
                  <p class="text-sm text-orange-700">
                    Estes são os produtos que estão competindo diretamente com o
                    seu na mesma categoria
                  </p>
                </UiCardHeader>
                <UiCardContent>
                  <div class="space-y-6">
                    <!-- Summary -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div
                        class="text-center p-4 bg-white rounded-lg border border-orange-200"
                      >
                        <div class="text-2xl font-bold text-orange-900 mb-1">
                          {{ suggestion.metadata.compared_values }}
                        </div>
                        <p class="text-sm text-orange-600">
                          Concorrentes Analisados
                        </p>
                      </div>

                      <div
                        class="text-center p-4 bg-white rounded-lg border border-orange-200"
                      >
                        <div class="text-2xl font-bold text-orange-900 mb-1">
                          {{ suggestion.metadata.graph.length }}
                        </div>
                        <p class="text-sm text-orange-600">
                          Produtos Similares
                        </p>
                      </div>

                      <div
                        class="text-center p-4 bg-white rounded-lg border border-orange-200"
                      >
                        <div class="text-2xl font-bold text-orange-900 mb-1">
                          {{ formatDate(suggestion.last_updated) }}
                        </div>
                        <p class="text-sm text-orange-600">Última Análise</p>
                      </div>
                    </div>

                    <!-- Competitors List -->
                    <div
                      v-if="
                        suggestion.metadata.graph &&
                        suggestion.metadata.graph.length > 0
                      "
                    >
                      <h4
                        class="font-semibold mb-4 flex items-center gap-2 text-orange-900"
                      >
                        <Users class="h-4 w-4" />
                        Produtos Concorrentes Identificados
                      </h4>
                      <div class="space-y-3">
                        <div
                          v-for="(competitor, index) in suggestion.metadata
                            .graph"
                          :key="index"
                          class="bg-white p-4 rounded-lg border border-orange-200 hover:shadow-md transition-shadow"
                        >
                          <div class="flex items-start justify-between mb-3">
                            <div class="flex-1">
                              <h5
                                class="font-medium text-gray-900 mb-2 line-clamp-2"
                              >
                                🏪 {{ competitor.info.title }}
                              </h5>
                              <div class="flex items-center gap-4 text-sm">
                                <div class="flex items-center gap-1">
                                  <ShoppingCart class="h-3 w-3 text-blue-600" />
                                  <span class="text-gray-600">Vendidos:</span>
                                  <span class="font-medium">{{
                                    competitor.info.sold_quantity
                                  }}</span>
                                </div>
                                <UiBadge
                                  :variant="
                                    getCompetitiveness(competitor) === 'high'
                                      ? 'destructive'
                                      : getCompetitiveness(competitor) ===
                                        'medium'
                                      ? 'default'
                                      : 'secondary'
                                  "
                                  class="text-xs"
                                >
                                  {{
                                    getCompetitiveness(competitor) === "high"
                                      ? "Alta Concorrência"
                                      : getCompetitiveness(competitor) ===
                                        "medium"
                                      ? "Média Concorrência"
                                      : "Baixa Concorrência"
                                  }}
                                </UiBadge>
                              </div>
                            </div>

                            <div class="text-right ml-4">
                              <div class="text-xl font-bold text-gray-900 mb-1">
                                {{
                                  formatPrice(
                                    competitor.price.amount,
                                    suggestion.currency_id
                                  )
                                }}
                              </div>
                              <UiBadge
                                :variant="
                                  getPriceComparison(competitor) === 'higher'
                                    ? 'destructive'
                                    : getPriceComparison(competitor) === 'lower'
                                    ? 'default'
                                    : 'secondary'
                                "
                                class="text-xs"
                              >
                                {{
                                  getPriceComparison(competitor) === "higher"
                                    ? "⬆️ Mais caro que você"
                                    : getPriceComparison(competitor) === "lower"
                                    ? "⬇️ Mais barato que você"
                                    : "🟰 Mesmo preço"
                                }}
                              </UiBadge>
                            </div>
                          </div>

                          <!-- Competitive Analysis -->
                          <div class="pt-3 border-t border-orange-100">
                            <div class="grid grid-cols-2 gap-4 text-xs">
                              <div>
                                <span class="text-gray-600"
                                  >Diferença de preço:</span
                                >
                                <p
                                  :class="`font-medium ${
                                    competitor.price.amount >
                                    suggestion.current_price.amount
                                      ? 'text-green-600'
                                      : 'text-red-600'
                                  }`"
                                >
                                  {{
                                    competitor.price.amount >
                                    suggestion.current_price.amount
                                      ? "+"
                                      : ""
                                  }}
                                  {{
                                    formatPrice(
                                      competitor.price.amount -
                                        suggestion.current_price.amount,
                                      suggestion.currency_id
                                    )
                                  }}
                                </p>
                              </div>
                              <div>
                                <span class="text-gray-600"
                                  >Vantagem competitiva:</span
                                >
                                <p
                                  :class="`font-medium ${
                                    competitor.price.amount >
                                    suggestion.current_price.amount
                                      ? 'text-green-600'
                                      : 'text-orange-600'
                                  }`"
                                >
                                  {{
                                    competitor.price.amount >
                                    suggestion.current_price.amount
                                      ? "Você está mais barato"
                                      : "Concorrente mais barato"
                                  }}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Competitive Summary -->
                      <div
                        class="mt-6 p-4 bg-white rounded-lg border-2 border-orange-300"
                      >
                        <h5
                          class="font-medium text-orange-900 mb-3 flex items-center gap-2"
                        >
                          <Zap class="h-4 w-4" />
                          Resumo da Concorrência:
                        </h5>
                        <div
                          class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm"
                        >
                          <div>
                            <span class="text-orange-700"
                              >Preço médio dos concorrentes:</span
                            >
                            <p class="font-semibold text-orange-900 text-lg">
                              {{
                                formatPrice(
                                  getAverageCompetitorPrice(),
                                  suggestion.currency_id
                                )
                              }}
                            </p>
                          </div>
                          <div>
                            <span class="text-orange-700"
                              >Vendas médias dos concorrentes:</span
                            >
                            <p class="font-semibold text-orange-900 text-lg">
                              {{ Math.round(getAverageSoldQuantity()) }}
                              unidades
                            </p>
                          </div>
                          <div>
                            <span class="text-orange-700"
                              >Sua posição competitiva:</span
                            >
                            <p class="font-semibold text-orange-900">
                              {{ getCompetitivePosition() }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </UiCardContent>
              </UiCard>

              <!-- Costs Analysis -->
              <UiCard>
                <UiCardHeader>
                  <UiCardTitle class="flex items-center gap-2">
                    <DollarSign class="h-5 w-5" />
                    Análise de Custos e Margem
                  </UiCardTitle>
                </UiCardHeader>
                <UiCardContent>
                  <div class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        class="flex items-center justify-between p-3 bg-orange-50 rounded border border-orange-200"
                      >
                        <div>
                          <span class="text-sm font-medium text-orange-800"
                            >Taxa de Venda:</span
                          >
                          <p class="text-xs text-orange-600">
                            Comissão do Mercado Livre
                          </p>
                        </div>
                        <span class="font-bold text-orange-900">
                          {{
                            formatPrice(
                              suggestion.costs.selling_fees,
                              suggestion.currency_id
                            )
                          }}
                        </span>
                      </div>

                      <div
                        class="flex items-center justify-between p-3 bg-blue-50 rounded border border-blue-200"
                      >
                        <div>
                          <span class="text-sm font-medium text-blue-800"
                            >Taxa de Envio:</span
                          >
                          <p class="text-xs text-blue-600">
                            Custos de logística
                          </p>
                        </div>
                        <span class="font-bold text-blue-900">
                          {{
                            formatPrice(
                              suggestion.costs.shipping_fees,
                              suggestion.currency_id
                            )
                          }}
                        </span>
                      </div>
                    </div>

                    <div
                      class="p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div class="flex items-center justify-between mb-3">
                        <span class="font-semibold text-gray-800"
                          >Total de Custos:</span
                        >
                        <span class="font-bold text-gray-900 text-lg">
                          {{
                            formatPrice(
                              suggestion.costs.selling_fees +
                                suggestion.costs.shipping_fees,
                              suggestion.currency_id
                            )
                          }}
                        </span>
                      </div>

                      <div class="space-y-2 pt-3 border-t border-gray-300">
                        <div class="flex justify-between text-sm">
                          <span class="text-gray-600"
                            >Lucro com preço atual:</span
                          >
                          <span
                            :class="`font-medium ${
                              getCurrentProfit() > 0
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`"
                          >
                            {{
                              formatPrice(
                                getCurrentProfit(),
                                suggestion.currency_id
                              )
                            }}
                          </span>
                        </div>

                        <div class="flex justify-between text-sm">
                          <span class="text-gray-600"
                            >Lucro com preço sugerido:</span
                          >
                          <span
                            :class="`font-medium ${
                              getSuggestedProfit() > 0
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`"
                          >
                            {{
                              formatPrice(
                                getSuggestedProfit(),
                                suggestion.currency_id
                              )
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </UiCardContent>
              </UiCard>

              <!-- Promotion Details -->
              <UiCard v-if="suggestion.promotion_detail">
                <UiCardHeader>
                  <UiCardTitle class="flex items-center gap-2">
                    <Percent class="h-5 w-5" />
                    Detalhes da Promoção
                  </UiCardTitle>
                </UiCardHeader>
                <UiCardContent>
                  <div class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p class="text-sm text-gray-600">Campanha:</p>
                        <p class="font-medium">
                          {{ suggestion.promotion_detail.campaign_name }}
                        </p>
                      </div>
                      <div>
                        <p class="text-sm text-gray-600">Desconto:</p>
                        <p class="font-medium">
                          {{ suggestion.promotion_detail.discount_percent }}%
                        </p>
                      </div>
                      <div>
                        <p class="text-sm text-gray-600">Início:</p>
                        <p class="font-medium">
                          {{
                            formatDate(
                              suggestion.promotion_detail.campaign_start_date
                            )
                          }}
                        </p>
                      </div>
                      <div>
                        <p class="text-sm text-gray-600">Fim:</p>
                        <p class="font-medium">
                          {{
                            formatDate(
                              suggestion.promotion_detail.campaign_end_date
                            )
                          }}
                        </p>
                      </div>
                    </div>

                    <div
                      v-if="suggestion.promotion_detail.unhealthy_reason"
                      class="p-3 bg-orange-50 rounded border border-orange-200"
                    >
                      <p class="text-sm text-orange-800">
                        <strong>Motivo:</strong> {{ getUnhealthyReason() }}
                        <span v-if="suggestion.promotion_detail.days_unhealthy">
                          ({{
                            suggestion.promotion_detail.days_unhealthy
                          }}
                          dias)</span
                        >
                      </p>
                    </div>
                  </div>
                </UiCardContent>
              </UiCard>
            </div>
          </div>
        </UiCardContent>
      </UiCard>
    </template>
  </Page>
</template>

<style scoped></style>
