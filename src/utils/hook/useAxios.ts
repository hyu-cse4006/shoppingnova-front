import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

const useAxios = (config: AxiosRequestConfig) => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios(config);
      console.log(response);
      setResponse(response);
    } catch (error) {
      setError(error as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [config]);

  return { response, loading, error };
};

export default useAxios;
