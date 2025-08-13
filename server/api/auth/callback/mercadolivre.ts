import { handleCallback } from "~/lib/auth";
import { ML_SESSION } from "~/lib/contants";
import { createSession } from "~/lib/session";
export default defineEventHandler(async (event) => {
  // 1. Trocar code por token no Mercado Livre
  const tokenResponse = await handleCallback(event);

  if (!tokenResponse)
    return createError({
      status: 500,
      message: "Erro ao pegar o token de acesso ",
    });
  // 2. Criar sessão no servidor
  const session = await createSession({
    mlAccessToken: tokenResponse.access_token,
    mlRefreshToken: tokenResponse.refresh_token,
    mlExpiresIn: tokenResponse.expires_in,
    mlUserId: tokenResponse.user_id.toString(),
  });

  // 3. Configurar cookie seguro
  setCookie(event, ML_SESSION, session.id, {
    httpOnly: true,
    secure: true, // HTTPS obrigatório
    sameSite: "strict",
    maxAge: tokenResponse.expires_in,
    domain: ".adryannrafael.online",
  });

  setResponseHeader(event, "Location", "/");
  setResponseStatus(event, 302);
});
