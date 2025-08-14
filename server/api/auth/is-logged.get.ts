import { getSession } from "@/lib/session";
import type { AuthAccessInput } from "~/dto/input/auth-access.input";
import { ML_SESSION } from "~/lib/contants";

export default defineEventHandler(async (event) => {
  const sessionId = getCookie(event, ML_SESSION);
  if (!sessionId) throw createError({ statusCode: 401 });

  const session = await getSession(sessionId);
  if (!session) throw createError({ statusCode: 401 });

  return {
    expire: session.mlExpiresIn,
  } as AuthAccessInput;
});
