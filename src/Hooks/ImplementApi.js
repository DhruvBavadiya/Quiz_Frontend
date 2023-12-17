// useTrendingSection.js

import useApi from './useApi';

const ImplementApi = () => {
  const { response, loading, error } = useApi('getbycategory');

  return { trendingSections: response?.section, loading, error };
};

export default ImplementApi;
