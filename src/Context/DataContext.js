// DataContext.js
import React, { createContext, useContext, useState } from 'react';
import useGenericApi from '../Hooks/useGenericApi';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [trending, setTrending] = useState([]);
  const [category, setCategory] = useState([]);

  const {
    response: trendingResponse,
    loading: trendingLoading,
    error: trendingError,
    fetchData: fetchTrendingData,
  } = useGenericApi();

  const {
    response: categoryResponse,
    loading: categoryLoading,
    error: categoryError,
    fetchData: fetchCategoryData,
  } = useGenericApi();

  const fetchTrending = async () => {
    await fetchTrendingData('gettrending', 'GET');
    setTrending(trendingResponse?.section || []);
  };

  const fetchCategory = async () => {
    await fetchCategoryData('getsection', 'GET');
    setCategory(categoryResponse?.section || []);
  };

  return (
    <DataContext.Provider value={{ trending, fetchTrending, category, fetchCategory }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
