import { useState, useCallback } from "react";

const useFetchApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchApi = useCallback(async ({ url, method = "GET", token = "", body = null, formData = null }) => {
    console.log("i am calling")

    setLoading(true);
    setError(null);

    const headers = new Headers();
    if (token) headers.append("Authorization", `Bearer ${token}`);
    if (body) headers.append("Content-Type", "application/json");

    const requestOptions = {
      method,
      headers,
      body: body ? JSON.stringify(body) : formData,
      redirect: "follow",
    };

    try {
      const response = await fetch(url, requestOptions);
      const result = await response.json();
   


      if (!response.ok || result.resultType === "FAIL") {
        setError(result?.data || "Unknown Error");
        console.log(result?.data," fetch Api Hook error")
        return null;
      }

      return result.data; 
    } catch (err) {
      setError("Something went wrong");
      console.log("Error:", err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);


  return { fetchApi, loading, error };
};

export default useFetchApi;
