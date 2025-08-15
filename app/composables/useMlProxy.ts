import type { MlProxyFetch } from "~/dto/input/ml-proxy.input";

export const useMlProxy = () => {
  // Método para chamadas à API do Mercado Livrex
  const router = useRouter();
  const send = async <R /* Response Type */, B = any /* Body Type */>(
    request: MlProxyFetch<B>
  ) => {
    const { data, error } = await useFetch("/api/proxy/ml", {
      method: "POST",
      body: { request: request },
      credentials: "include",
    });

    if (error) {
      // alert(`${error.value?.statusCode} - ${error.value?.message}`);
      // if (error.value?.statusCode == 401) {
      //   router.replace("/login");
      // }
    }
    const erro: typeof error.value = error.value;
    return { info: data.value as R, error: erro };
  };

  return {
    send,
  };
};
