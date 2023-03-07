import { useState, useEffect } from 'react';
import axios from 'axios';

import { API_URL } from '@/app/constants/api.constants';

function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    const urlFull = API_URL + url;

    console.log('\n');
    console.log('useFetch(), urlFull: ', urlFull);

    axios
      .get(urlFull)
      .then((response) => {
        console.log('useFetch(), then(), response: ', response);
        setData(response.data.payload);
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