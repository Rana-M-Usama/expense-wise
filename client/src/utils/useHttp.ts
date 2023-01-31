import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { useCallback, useState } from "react";

const baseURL = process.env.REACT_APP_API_URI;

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async (url: string, method = "GET", body: any = null) => {
      setLoading(true);
      try {
        const requestConfig: AxiosRequestConfig = {
          url: baseURL + url,
          method,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          } as unknown as AxiosRequestHeaders,
        };

        if (body) {
          requestConfig.data = JSON.stringify(body);
        }

        const response = await axios(requestConfig);

        setLoading(false);
        return response.data;
      } catch (error: any) {
        setLoading(false);
        setError(error.response.data.errors.join());
        throw error;
      }
    },
    [],
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};

export default useHttp;
