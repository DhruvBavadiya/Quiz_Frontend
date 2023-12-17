// useApi.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const useApi = (endpoint, method = 'GET', data = null) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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
        console.log(result)
        setResponse(result.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, method, data]);

  return { response, loading, error };
};

export default useApi;
