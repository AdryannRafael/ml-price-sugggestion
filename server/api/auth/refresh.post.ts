import { getSession, refreshSession } from "@/lib/session";
import { AuthAccessInput } from "~/dto/input/auth-access.input";
import { MlSessionInput } from "~/dto/input/ml-session.input";
import { calculateExpirationDate, refresh } from "~/lib/auth";
import { ML_SESSION } from "~/lib/contants";

export default defineEventHandler(async (event) => {
  const sessionId = getCookie(event, ML_SESSION);
  if (!sessionId) throw createError({ statusCode: 401 });

  const session = await getSession(sessionId);
  if (!session) throw createError({ statusCode: 401 });

  const tokenResponse = await refresh(event, session);
  const tokens: MlSessionInput = {
    mlAccessToken: tokenResponse.access_token,
    mlRefreshToken: tokenResponse.refresh_token,
    mlExpiresIn: calculateExpirationDate(tokenResponse.expires_in),
    mlUserId: tokenResponse.user_id.toString(),
  };
  await refreshSession(session.id, tokens);

  return {
    expire: session.mlExpiresIn,
  } as AuthAccessInput;
});
