// src/types/UseFetchOptions.ts

export interface UseFetchOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  skip?: boolean;
}
