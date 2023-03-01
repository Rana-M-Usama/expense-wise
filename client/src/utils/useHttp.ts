import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setCurrentUserEmpty } from "slices/userSlice";

const baseURL = process.env.REACT_APP_API_URI;

const useHttp = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async (
      url: string,
      method = "GET",
      body: any = null,
      contentType = "application/json",
    ) => {
      setLoading(true);
      try {
        const requestConfig: AxiosRequestConfig = {
          url: baseURL + url,
          method,
          headers: {
            "Content-Type": contentType,
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          } as unknown as AxiosRequestHeaders,
        };

        if (body) {
          requestConfig.data =
            contentType === "application/json" ? JSON.stringify(body) : body;
        }

        const response = await axios(requestConfig);

        setLoading(false);
        return response.data;
      } catch (error: any) {
        if (error.message === "Network Error") {
          setLoading(false);
          setError("Server is not responding at the moment");
          throw error;
        }
        if (error.response.status === 401) {
          dispatch(setCurrentUserEmpty());
          navigate("/");
        }
        setLoading(false);
        setError(error.response.data.errors.join(" "));
        throw error;
      }
    },
    [],
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};

export default useHttp;
