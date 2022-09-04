import { useEffect, useState } from 'react';

const useFetch = callback => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await callback();
      console.log('response is: ', response);
      setData(response);
      setLoading(false);
    } catch (err) {
      console.log('error', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetch;
