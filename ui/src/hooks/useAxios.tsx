import { AxiosError } from "axios";
import { api } from "../utils/axios";
import { useEffect, useState } from "react";
import type { AxiosRequestConfig, AxiosError as AxiosErrorInterface } from "axios";

function useAxios<T>(url: string | null, options?: AxiosRequestConfig) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosErrorInterface | null>(null);

  const fetchData = async (signal: AbortSignal) => {
    setLoading(true);
    if (!url) {
      return;
    }
    try {
      const response = await api.get<T>(url, { ...options, signal });
      setData(response.data);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.code === "ERR_CANCELED") {
          console.error("Request aborted by client");
        } else {
          setError(err);
        }
      } else if (err instanceof Error) {
        setError(new AxiosError(err.message));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!url) {
      setData(null);
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    const signal = controller.signal;
    fetchData(signal);

    return () => {
      controller.abort();
    };
  }, [url, options]);

  return { data, loading, error, fetchData };
}

export default useAxios;
