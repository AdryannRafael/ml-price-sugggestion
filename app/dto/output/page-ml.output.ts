export interface PageOutput<T> {
  results: T[];
  paging: PagingOutput;
}

export interface PagingOutput {
  limit: number;
  offset: number;
  total: number;
}
