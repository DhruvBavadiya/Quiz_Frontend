/* eslint-disable import/no-anonymous-default-export */
// useTrendingSection.js

import useApi from './useApi';

const ImplementApi = () => {
  const { response, loading, error } = useApi('getbycategory');

  return { trendingSections: response?.section, loading, error };
};

const SignUser = ()=>{
  const {response,loading,error} = useApi('signup');
  return {user:response,loading,error}
}
export default {SignUser,ImplementApi}