import { useState, useEffect, useMemo } from "react";
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

const useAxios = () => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchData = useMemo(
    () => async (config: AxiosRequestConfig) => {
      setError(null);
      try {
        console.log(config);

        const response = await axios(config);
        console.log(response);
        setResponse(response);
      } catch (error) {
        setError(error as AxiosError);
      }
    },
    []
  );

  return { response, error, fetchData };
};

export default useAxios;
