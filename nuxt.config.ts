// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  // app: {
  //   pageTransition: { name: "page", mode: "out-in" },
  // },
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
    ML_BASE_URI: process.env.ML_BASE_URI,
    ML_AUTH_URI: process.env.ML_AUTH_URI,
    ML_CLIENT_ID: process.env.ML_CLIENT_ID,
    ML_CLIENT_SECRET: process.env.ML_CLIENT_SECRET,
    NUXT_PUBLIC_BASE_URL: process.env.ML_BASE_URL,
    //   public: {
    //     mlClientId: process.env.ML_CLIENT_ID,
    //     mlCallbackUrl:
    //       "https://receitadodia.adryannrafael.online/api/auth/callback/mercadolivre",
    //   },
    //   mlClientSecret: process.env.ML_CLIENT_SECRET,
  },
});
