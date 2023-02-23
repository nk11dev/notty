import { useState, useEffect } from 'react';
import axios from 'axios';

import { API_PATH } from '@/app/constants/api.constants';

function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    console.log('\n');
    console.log('useFetch(), url: ', url);

    axios
      .get(API_PATH + url)
      .then((response) => {
        console.log('useFetch(), then(), response: ', response);
        setData(response.data);
      })
      .catch((err) => {
        console.log('useFetch(), catch(), err: ', err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [url])

  return { data, isLoading, error };
}

export default useFetch;