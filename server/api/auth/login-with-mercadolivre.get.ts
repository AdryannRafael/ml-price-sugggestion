import { loginWithMercadoLivre } from "~/lib/auth";

export default defineEventHandler(async (e) => {
  const url = loginWithMercadoLivre(e);
  setResponseHeader(e, "Location", url);
  setResponseStatus(e, 302);
});
