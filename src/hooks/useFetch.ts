import { UseFetchOptions } from "@/types/UseFetchOptions";
import { useCallback, useEffect, useState } from "react";

export function useFetch<T = any>(
  url: string,
  options: UseFetchOptions = {},
  deps: any[] = []
) {
  const { method = "GET", headers = {}, body, skip = false } = options;
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Allow refetch to override options (e.g., body)
  const fetchData = useCallback(
    async (overrideOptions?: Partial<UseFetchOptions>) => {
      // Always allow refetch, even if skip is true (skip only disables auto-fetch)
      setLoading(true);
      setError("");
      try {
        const finalMethod = overrideOptions?.method || method;
        const finalHeaders = overrideOptions?.headers || headers;
        const finalBody =
          overrideOptions && "body" in overrideOptions
            ? overrideOptions.body
            : body;
        const res = await fetch(url, {
          method: finalMethod,
          headers: finalHeaders,
          body: finalBody ? JSON.stringify(finalBody) : undefined,
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          setError(err.message || "Request failed");
          setData(null);
        } else {
          const result = await res.json();
          setData(result);
        }
      } catch (e: any) {
        setError("Network error");
        setData(null);
      }
      setLoading(false);
    },
    [url, method, JSON.stringify(headers), JSON.stringify(body), skip, ...deps]
  );

  useEffect(() => {
    if (!skip) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [fetchData, skip]);

  return { data, error, loading, refetch: fetchData };
}
