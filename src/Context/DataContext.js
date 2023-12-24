/* eslint-disable no-unused-vars */
// DataContext.js
import React, { createContext, useContext, useState } from 'react';
import useGenericApi from '../Hooks/useGenericApi';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [trending, setTrending] = useState([]);
  const [category, setCategory] = useState([]);
  const [questions , setQuestions] = useState([])
  const [loading , setLoading] = useState(true)
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

  const fetchTrending = async (data) => {
    console.log('Fetching trending data...');
    await fetchTrendingData('gettrending', 'GET');
    setTrending(trendingResponse?.section || []);
  };
  
  const fetchCategory = async () => {
    console.log('Fetching category data...');
    await fetchCategoryData('getsection', 'GET');
    setCategory(categoryResponse?.section || []);
  };  

  const {
    response: questionResponse,
    loading: questionLoading,
    error: questionError,
    fetchData: fetchQuestionsData
  } = useGenericApi();

  const fetchQuestions = async (data) => {
    console.log('Fetching questions data...');
    await fetchQuestionsData(`getbycategory?category=${data.selectedSubject}&difficulty=${data.selectedDifficulty}`, 'GET');
    setQuestions(questionResponse.questions || []);
    setLoading(false)
  };
  

  return (
    <DataContext.Provider value={{ trending, fetchTrending, category, fetchCategory , questions , fetchQuestions}}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
