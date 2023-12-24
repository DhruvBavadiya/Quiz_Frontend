import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const   useGenericApi = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (endpoint, method, data = null) => {

    try {
      setLoading(true);
      const axiosConfig = {
        method,
        url: `https://quiz-app-pj53.onrender.com/app/v1/${endpoint}`,
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed
        },
      };

      if (data) {
        axiosConfig.data = data;
      }

      const result = await axios(axiosConfig);
      setResponse(result.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array means this function will not change between renders

  useEffect(() => {
    // Cleanup function
    return () => {
      // Cancel the request or perform any cleanup if needed
    };
  }, []);

  return { response, loading, error, fetchData };
};

export default useGenericApi;
