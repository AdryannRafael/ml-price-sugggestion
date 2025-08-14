const config = useRuntimeConfig();

export const MercadoLivreProvider = () => ({
  authority: config.ML_AUTH_URI!,
  client_id: config.ML_CLIENT_ID!,
  client_secret: config.ML_CLIENT_SECRET!,
  redirect_uri: `${config.public
    .NUXT_PUBLIC_BASE_URL!}/api/auth/callback/mercadolivre`, // Novo callback
  response_type: "code",
  scope: "offline_access read write",
  post_logout_redirect_uri: `${config.public.NUXT_PUBLIC_BASE_URL!}/`, // Pós-logout
  automaticSilentRenew: false,
  loadUserInfo: false,
});
