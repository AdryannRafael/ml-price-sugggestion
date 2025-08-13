import type { MlProxyFetch } from "@/dto/input";
import { getSession } from "@/lib/session";

export default defineEventHandler<any>(async (event) => {
  const config = useRuntimeConfig();

  const mlUri: string = config.ML_BASE_URI!;
  const sessionId = getCookie(event, "ml_session");
  if (!sessionId) throw createError({ statusCode: 401 });

  const session = await getSession(sessionId);
  if (!session) throw createError({ statusCode: 401 });

  const { request } = await readBody(event);
  const { path, userID }: MlProxyFetch<any> = request;

  const fetchMl =
    path && !!userID ? path.replace("$USER_ID", session.mlUserId) : path;

  try {
    const fetchedMlRes = await $fetch<any>(fetchMl, {
      baseURL: mlUri,
      headers: {
        Authorization: `Bearer ${session.mlAccessToken}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    return fetchedMlRes;
  } catch ({ data }: any) {
    return createError({
      message: data.message,
      status: data.status,
    });
  }
});
