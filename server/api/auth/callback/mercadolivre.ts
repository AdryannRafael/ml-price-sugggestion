import type { MlSessionInput } from "@/dto/input/ml-session.input";
import { AuthAccessInput } from "~/dto/input/auth-access.input";
import { UserInfoOutput } from "~/dto/output/user-info.output";
import { calculateExpirationDate, handleCallback } from "~/lib/auth";
import { ML_SESSION } from "~/lib/contants";
import { createSession } from "~/lib/session";

export default defineEventHandler(async (event) => {
  // 1. Trocar code por token no Mercado Livre

  const config = useRuntimeConfig();
  const uri: string = config.public.NUXT_PUBLIC_BASE_URL!;
  const mlUri: string = config.ML_BASE_URI!;
  const tokenResponse = await handleCallback(event);

  if (!tokenResponse)
    return createError({
      status: 500,
      message: "Erro ao pegar o token de acesso ",
    });
  const tokens: MlSessionInput = {
    mlAccessToken: tokenResponse.access_token,
    mlRefreshToken: tokenResponse.refresh_token,
    mlExpiresIn: calculateExpirationDate(tokenResponse.expires_in),
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
  let responseBody: AuthAccessInput = {
    expire: tokens.mlExpiresIn,
  };

  try {
    const fetchUser = await fetch(mlUri + "/users/me", {
      headers: { Authorization: `Bearer ${tokens.mlAccessToken}` },
    });
    const { first_name, last_name, seller_experience, status }: UserInfoOutput =
      await fetchUser.json();
    responseBody = {
      ...responseBody,
      name: `${first_name} ${last_name}`,
      seller_experience: seller_experience,
      status: status,
    };
  } catch (e) {
    return createError({
      status: 500,
      message: "Erro ao pegar o token de acesso ",
    });
  }

  const json = JSON.stringify(responseBody);

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
