import type { AuthAccessInput } from "~/dto/input/auth-access.input";
import { ML_DATA } from "~/lib";

export const useAuthMl = () => {
  const auth = ref<AuthAccessInput | null>(null);

  if (import.meta.client) {
    const savedAuth = localStorage.getItem(ML_DATA);
    if (savedAuth) {
      auth.value = JSON.parse(savedAuth);
    }
  }

  /**Inicializadora */
  const initSession = function (input: AuthAccessInput) {
    /** sobresreve a auth atual
     *
     */
    /**Em milisegundos */

    auth.value = input;
    localStorage.setItem(ML_DATA, JSON.stringify(input));
  };
  /**Verificador */
  const isLogged = async function () {
    /**
     * 1 - Pergunta pro back se a sessao ainda ta ativa
     * 2 - Verifica a data de expiração
     * se tiver expirado
     * ele chama o back para refresh
     * se não retorna true
     */
    const { data, error } = await useFetch<AuthAccessInput>(
      "/api/auth/is-logged",
      {
        credentials: "include",
      }
    );
    if (error) return; // desloga
    if (!auth.value) {
      initSession(data.value!);
    }

    // Verifica a data de expiração
    const timeUntilExpiration = computed(() => {
      return auth.value!.expire - Date.now();
    });
    const shoudRefresh = computed(() => {
      return (
        timeUntilExpiration.value <= 0 || timeUntilExpiration.value < 300000
      );
    });
    //verificando se dever fazer o refresh

    if (shoudRefresh.value) {
      // chama o back para fazer refresh token
      await refreshSession();
    }
    return true;
  };

  const refreshSession = async function () {
    const { data, error } = await useFetch<AuthAccessInput>(
      "/api/auth/refresh",
      {
        method: "POST",
        credentials: "include",
      }
    );
    if (error) return; // desloga
    initSession(data.value!);
  };

  return {
    initSession,
    isLogged,
    auth,
  };
};
