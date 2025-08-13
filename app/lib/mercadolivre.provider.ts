export const MercadoLivreProvider = () => ({
  authority: "https://auth.mercadolivre.com.br",
  client_id: "3604564117965423",
  client_secret: "98AU1t5y2ap1S5vD0A7Ki8w1kFO8tiCy",
  redirect_uri:
    "https://receitadodia.adryannrafael.online/api/auth/callback/mercadolivre", // Novo callback
  response_type: "code",
  scope: "offline_access read write",
  post_logout_redirect_uri: "https://receitadodia.adryannrafael.online/", // Pós-logout
  automaticSilentRenew: false,
  loadUserInfo: false,
});
