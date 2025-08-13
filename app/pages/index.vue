<script setup lang="ts">
const { send } = useMlProxy();
const route = useRouter();
// const search = async () => {
//   // const b = await withAuth(async () => ({ path: `/users/me` }));
//   const { data, error } = await send(async () => ({ path: `/users/me` }));
//   // send<{ a: any }>(async () => ({
//   //   path: `/suggestions/user/$USER_ID/items`,
//   //   userID: true,
//   // }));
//   if (error) return console.error(error);
//   console.log(data.value);
// };

function redirectToLogin() {
  route.push("/login");
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Hero Section - Cores Mercado Livre -->
    <section
      class="flex-grow flex items-center justify-center relative py-5 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#FFE600] to-[#3483FA] text-[#333333]"
      style="height: 80vh; min-height: 80vh"
    >
      <div class="w-full max-w-6xl mx-auto h-full">
        <div class="w-full top-0 z-50">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16 md:h-20">
              <!-- Logo/Título -->
              <div class="flex-shrink-0 flex items-center">
                <p class="text-2xl font-bold text-black">Melhorando Ecom</p>
              </div>

              <!-- Menu para desktop -->
              <div class="hidden md:block">
                <div class="ml-10 flex items-center space-x-8">
                  <a
                    href="#"
                    class="text-[#333333] hover:text-white px-3 py-2 text-base font-medium transition-colors"
                    >Serviços</a
                  >
                  <a
                    href="#"
                    class="text-[#333333] hover:text-white px-3 py-2 text-base font-medium transition-colors"
                    >Sobre</a
                  >
                  <a
                    href="#"
                    class="text-[#333333] hover:text-white px-3 py-2 text-base font-medium transition-colors"
                    >Entre em contato</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Conteúdo Principal -->
        <div class="flex flex-col md:flex-row items-center h-full pt-16">
          <!-- Coluna Esquerda -->
          <div class="md:w-1/2 flex flex-col justify-center">
            <h1 class="text-4xl md:text-5xl font-bold text-[#333333] mb-6">
              Ferramenta de Precificação Inteligente
            </h1>
            <p class="text-lg md:text-xl text-[#666666] mb-8">
              Otimize seus preços no Mercado Livre com nossa tecnologia avançada
            </p>
            <button
              @click="redirectToLogin"
              class="bg-[#3483FA] hover:bg-[#2968C8] text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors w-full md:w-auto"
            >
              Começar Agora
            </button>
          </div>

          <!-- Coluna Direita (imagem ou ilustração) -->
          <div class="md:w-1/2 flex justify-end align-start mt-10 md:mt-0">
            <!-- <div
              class="bg-white p-6 rounded-xl shadow-xl border border-[#EEEEEE]"
            > -->
            <!-- Espaço para imagem/graph -->
            <!-- <div
                class="w-64 h-64 bg-[#FFE600] rounded-lg flex items-center justify-center"
              >
               
              </div> -->
            <img
              src="/price.png"
              class="w-full max-w-md"
              alt="Price Suggestion"
            />
            <!-- </div> -->
          </div>
        </div>
      </div>
    </section>

    <!-- Seção de Recursos -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-[#333333] mb-12">
          Nossos Recursos
        </h2>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Recurso 1 -->
          <div class="bg-[#F5F5F5] p-6 rounded-lg border border-[#EEEEEE]">
            <div class="text-[#3483FA] text-3xl mb-4">🔍</div>
            <h3 class="text-xl font-bold text-[#333333] mb-2">
              Análise de Mercado
            </h3>
            <p class="text-[#666666]">
              Monitoramento em tempo real dos concorrentes
            </p>
          </div>

          <!-- Recurso 2 -->
          <div class="bg-[#F5F5F5] p-6 rounded-lg border border-[#EEEEEE]">
            <div class="text-[#3483FA] text-3xl mb-4">📈</div>
            <h3 class="text-xl font-bold text-[#333333] mb-2">
              Sugestão Automática
            </h3>
            <p class="text-[#666666]">
              Preços otimizados para maximizar vendas
            </p>
          </div>

          <!-- Recurso 3 -->
          <div class="bg-[#F5F5F5] p-6 rounded-lg border border-[#EEEEEE]">
            <div class="text-[#3483FA] text-3xl mb-4">🔄</div>
            <h3 class="text-xl font-bold text-[#333333] mb-2">
              Atualização Contínua
            </h3>
            <p class="text-[#666666]">
              Ajustes automáticos conforme mudanças no mercado
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-[#333333] text-white py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <p class="text-xl font-bold text-[#FFE600]">Price Suggestion</p>
            <p class="text-[#999999]">
              Ferramenta para vendedores do Mercado Livre
            </p>
          </div>
          <div class="flex space-x-6">
            <a
              href="#"
              class="text-[#EEEEEE] hover:text-[#FFE600] transition-colors"
              >Termos</a
            >
            <a
              href="#"
              class="text-[#EEEEEE] hover:text-[#FFE600] transition-colors"
              >Privacidade</a
            >
            <a
              href="#"
              class="text-[#EEEEEE] hover:text-[#FFE600] transition-colors"
              >Contato</a
            >
          </div>
        </div>
        <div
          class="mt-8 pt-8 border-t border-[#444444] text-center text-[#999999]"
        >
          <p>&copy; 2023 Price Suggestion. Não afiliado ao Mercado Livre.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
<style scoped></style>
