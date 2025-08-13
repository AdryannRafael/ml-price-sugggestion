import type { MlProxyFetch } from "~/dto/input/ml-proxy.input";

export const useMlProxy = () => {
  // Método para chamadas à API do Mercado Livrex
  const send = async <R /* Response Type */, B = any /* Body Type */>(
    request: () => Promise<MlProxyFetch<B>>
  ) => {
    return useFetch<R>("/api/proxy/ml", {
      body: { request: await request() },
      credentials: "include",
    });
  };

  return {
    send,
  };
};
