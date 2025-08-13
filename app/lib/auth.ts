import criptojs from "crypto-js";
import type { TokenOutput } from "../dto/output/token.output";
import { MercadoLivreProvider } from "./mercadolivre.provider";

const { enc, SHA256 } = criptojs;
// import {
//   ML_REFRESH_TOKEN_STORAGE,
//   ML_TOKEN_EXPIRATION_STORAGE,
//   ML_USER_ID_STORAGE,
//   ML_USER_TOKEN_STORAGE,
// } from "../utils/constant";

const oidcSettings = MercadoLivreProvider();
// Gera um code_verifier e code_challenge (PKCE)
const generatePKCE = () => {
  const codeVerifier = enc.Base64.stringify(
    enc.Utf8.parse(Math.random().toString(36).substring(2, 128))
  );
  const codeChallenge = SHA256(codeVerifier)
    .toString(enc.Base64)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
  return { codeVerifier, codeChallenge };
};

// Redireciona para o Mercado Livre
export const loginWithMercadoLivre = (event: any) => {
  const { codeVerifier, codeChallenge } = generatePKCE();
  setCookie(event, "pkce_verifier", codeVerifier?.toString());
  // localStorage.setItem("pkce_verifier", codeVerifier);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: oidcSettings.client_id,
    redirect_uri: oidcSettings.redirect_uri,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
    state: "$12345",
  });
  const authUrl =
    `https://auth.mercadolivre.com.br/authorization?` + params.toString();
  // window.location.href = authUrl;
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

  const codeVerifier = getCookie(event, "pkce_verifier");

  if (!codeVerifier) throw new Error("PKCE verifier não encontrado");

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: oidcSettings.client_id,
    client_secret: oidcSettings.client_secret,
    code,
    redirect_uri: oidcSettings.redirect_uri,
    code_verifier: codeVerifier,
  });
  const fetchToken = await fetch("https://api.mercadolibre.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: params,
  });
  deleteCookie(event, "pkce_verifier");

  if (!fetchToken.ok) {
    throw new Error("Erro ao pegar token");
  }

  const output: TokenOutput = await fetchToken.json();
  console.log(output);
  // localStorage.setItem(ML_USER_TOKEN_STORAGE, output.access_token);
  // localStorage.setItem(ML_REFRESH_TOKEN_STORAGE, output.refresh_token);
  // localStorage.setItem(ML_USER_ID_STORAGE, output.user_id.toString());
  // localStorage.setItem(
  //   ML_TOKEN_EXPIRATION_STORAGE,
  //   output.expires_in.toString()
  // );

  return output;
};
