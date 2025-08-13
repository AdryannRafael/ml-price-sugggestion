import type { MlProxyFetch } from "@/dto/input";
import { getSession } from "@/lib/session";
export default defineEventHandler(async (event) => {
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
      baseURL: "https://api.mercadolibre.com",
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

  // if(fethedMlRes.error){
  //   return createError({
  //     message: fethedMlRes.data
  //   })
  // }
  // return fethedMlRes; //.error;
});
