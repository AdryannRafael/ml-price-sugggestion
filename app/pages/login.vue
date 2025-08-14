<script lang="ts" setup>
import { useAuthMl } from "~/composables/useAuthMl";
import type { AuthAccessInput } from "~/dto/input/auth-access.input";

const config = useRuntimeConfig();
const uri = config.public.NUXT_PUBLIC_BASE_URL!;
const { initSession } = useAuthMl();
const router = useRouter();

const listenerReturnAuthentication = async ({
  origin,
  data,
}: MessageEvent<AuthAccessInput>) => {
  console.log("Recebido:", event);

  /**Validar a origem */
  if (origin !== uri) {
    alert("Origem inválida: " + origin);
    return;
  }

  await initSession(data);
  router.replace("/dashboard");

  /**Aplicar a logica de guardar token ou outra coisa */
};
const loginWithML = async () => {
  window.open(
    `${uri}/api/auth/login-with-mercadolivre`,
    "MlAuth",
    "width=500,height=600"
  );
};

onMounted(() => {
  window.addEventListener("message", listenerReturnAuthentication);
});
onBeforeMount(() => {
  window.removeEventListener("message", listenerReturnAuthentication);
});
</script>

<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col bg-gradient-to-r from-[#FFE600] to-[#3483FA] text-[#333333]"
  >
    <!-- Header  -->
    <div class="w-full top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 md:h-20">
          <!-- Logo/Título -->
          <AppLogo />

          <!-- Menu para desktop -->
          <div class="hidden md:block"></div>
        </div>
      </div>
    </div>
    <!-- Container centralizado -->
    <main class="flex-grow flex items-center justify-center p-4">
      <div class="bg-white rounded-xl shadow-2xl p-10 w-full max-w-md">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Acesso</h2>
          <p class="text-lg text-gray-600 mt-2">
            Para continuar, você precisa vincular sua conta de venda. Por favor
            selecione um provedor.
          </p>
        </div>

        <button
          @click="loginWithML"
          class="w-full flex items-center justify-center space-x-2 bg-[#3483FA] hover:bg-[#2968C8] text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.372 18.236c-.696.696-1.538 1.248-2.477 1.641-1.56.624-3.3.96-5.103.96-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8c0 1.803-.336 3.543-.96 5.103-.393.939-.945 1.781-1.641 2.477z"
            />
          </svg>
          <span>Vincular com Mercado Livre</span>
          <img style="width: 40px" src="/logoml.svg" />
        </button>
      </div>
    </main>
    <AppFooter />
  </div>
</template>
