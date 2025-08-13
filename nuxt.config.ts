// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  devServer: {
    host: "0.0.0.0",
    port: 4000,
    https: false,
  },
  // vite: {
  //   server: {
  //     hmr: {
  //       protocol: "ws",
  //       host: "receitadodia.adryannrafael.online",
  //       port: 3000,
  //     },
  //   },
  // },
  runtimeConfig: {
    public: {
      mlClientId: process.env.ML_CLIENT_ID,
      mlCallbackUrl:
        "https://receitadodia.adryannrafael.online/api/auth/callback/mercadolivre",
    },
    mlClientSecret: process.env.ML_CLIENT_SECRET,
  },
});
