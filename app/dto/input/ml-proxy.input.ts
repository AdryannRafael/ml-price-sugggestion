export interface MlProxyFetch<B> {
  path: string;
  body?: B | null;
  userID?: boolean;
}
