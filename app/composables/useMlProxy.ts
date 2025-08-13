import type { MlProxyFetch } from "~/dto/input/ml-proxy.input";

export const useMlProxy = () => {
  // Método para chamadas à API do Mercado Livrex
  const send = async <R /* Response Type */, B = any /* Body Type */>(
    request: () => Promise<MlProxyFetch<B>>
  ) => {
    const { data, error } = await useFetch("/api/proxy/ml", {
      method: "POST",
      body: { request: await request() },
      credentials: "include",
    });

    return { data: data.value, error: error.value };
  };

  return {
    send,
  };
};
