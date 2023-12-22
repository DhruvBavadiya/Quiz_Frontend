// test.mjs
import React, { useEffect } from 'react';
import useGenericApi from '../Hooks/useGenericApi';

const Test = () => {
  const { response, loading, error, fetchData } = useGenericApi();

  useEffect(() => {
    // Example usage: Fetch data from 'getbycategory' endpoint
    fetchData('getbycategory', 'GET');
  }, []);

  console.log(response);

  return (
    <div>
      hello
    </div>
  );
};

export default Test;
