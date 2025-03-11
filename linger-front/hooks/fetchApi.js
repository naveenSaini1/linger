
import { useState, useCallback, useRef } from 'react';
let fail="FAIL"
const useFetchApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // Store the last request so we can re-call it on refresh
  const lastRequest = useRef(null);

  const fetchApi = useCallback(async (url, method = 'GET', token = '', body = null, formData = null, show = false) => {
    setLoading(true);
    setError(null);

    const headers = new Headers();
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }
    if (body) {
      headers.append("Content-Type", "application/json");
    }

    const requestOptions = {
      method,
      headers,
      body: body ? JSON.stringify(body) : formData,
      redirect: 'follow',
    };


    lastRequest.current = { url, method, token, body, formData, show };
    console.log(requestOptions," requestOpations ",url);
    try {
      const response = await fetch(url, requestOptions);
      const result = await response.json();

      if (!response.ok || result.resultType === fail) {
        if (show) errorMessage(`Something went wrong: ${result.data || response.statusText}`);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setData(result.data);
      return result.data;
    } catch (err) {

      setError(err);
      
      if (show) errorMessage(`Something went wrong: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Function to refresh the data (same request)
  const refreshData = useCallback(() => {
    if (lastRequest.current) {
      const { url, method, token, body, formData, show } = lastRequest.current;
      fetchApi(url, method, token, body, formData, show);
    }
  }, [fetchApi]);

  return { fetchApi, loading, error, data, refreshData };
};

export default useFetchApi;
