import { handleCallback } from "~/lib/auth";
import { ML_SESSION } from "~/lib/contants";
import { createSession } from "~/lib/session";
export default defineEventHandler(async (event) => {
  // 1. Trocar code por token no Mercado Livre

  const config = useRuntimeConfig();
  const uri: string = config.public.NUXT_PUBLIC_BASE_URL!;
  const tokenResponse = await handleCallback(event);

  if (!tokenResponse)
    return createError({
      status: 500,
      message: "Erro ao pegar o token de acesso ",
    });
  const tokens = {
    mlAccessToken: tokenResponse.access_token,
    mlRefreshToken: tokenResponse.refresh_token,
    mlExpiresIn: tokenResponse.expires_in,
    mlUserId: tokenResponse.user_id.toString(),
  };
  // 2. Criar sessão no servidor
  const session = await createSession(tokens);

  // 3. Configurar cookie seguro
  setCookie(event, ML_SESSION, session.id, {
    httpOnly: true,
    secure: true, // HTTPS obrigatório
    sameSite: "strict",
    maxAge: tokenResponse.expires_in,
    domain: ".adryannrafael.online",
  });

  const json = JSON.stringify({
    expire: tokenResponse.expires_in,
  });

  setResponseHeader(event, "Content-Type", "text/html");
  return `
            <html>
                <body>
                    <script>
                        window.opener.postMessage(${json}, "${uri}" );
                        window.close();
                    </script>
                </body>
            </html>
          `;
});
