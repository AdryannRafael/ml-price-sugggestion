import type { TokenOutput } from "../dto/output/token.output";
import { MercadoLivreProvider } from "../providers/mercadolivre.provider";
import { PKCE_VERIFIER } from "./contants";
import { generatePKCE } from "./pkce";

const oidcSettings = MercadoLivreProvider();

// Redireciona para o Mercado Livre
export const loginWithMercadoLivre = (event: any) => {
  const { codeVerifier, codeChallenge } = generatePKCE();
  setCookie(event, PKCE_VERIFIER, codeVerifier?.toString());

  const params = new URLSearchParams({
    response_type: "code",
    client_id: oidcSettings.client_id,
    redirect_uri: oidcSettings.redirect_uri,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
    state: "$12345",
  });
  const authUrl =
    `${oidcSettings.authority}/authorization?` + params.toString();
  return authUrl;
};

// Troca o "code" por um "token" (frontend-only, usando PKCE)
export const handleCallback = async (event: any) => {
  const query = getQuery(event);
  const code = query.code?.toString();
  if (!code)
    throw createError({
      statusCode: 403,
      statusMessage: "Parameter code id not present",
    });

  const codeVerifier = getCookie(event, PKCE_VERIFIER);

  if (!codeVerifier) throw new Error("PKCE verifier não encontrado");

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: oidcSettings.client_id,
    client_secret: oidcSettings.client_secret,
    code,
    redirect_uri: oidcSettings.redirect_uri,
    code_verifier: codeVerifier,
  });
  const mlUri: string = useRuntimeConfig().ML_BASE_URI + "/oauth/token";
  const fetchToken = await fetch(mlUri, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: params,
  });
  deleteCookie(event, PKCE_VERIFIER);

  if (!fetchToken.ok) {
    throw new Error("Erro ao pegar token");
  }

  const output: TokenOutput = await fetchToken.json();
  console.log(output);
  return output;
};
