// useApi.js
import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Fetches data from the specified URL.
 *
 * @param url The URL to fetch data from.
 * @returns An object containing the fetched data, loading status, and error.
 */
const useApi = <T>(
  url: string
): { data: T | null; loading: boolean; error: Error | null } => {
  
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<T>(url);
        setData(response.data);
        setError(null);
      } catch (error) {
        setError(error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return {  data, loading, error };
};

export default useApi;
