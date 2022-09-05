import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const useQueryState = (key, defaultValue, options) => {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get(key);
  let initialValue;
  if (queryParam) {
    if (options?.convertToJSON) {
      initialValue = JSON.parse(queryParam);
    } else if (options?.convertToNumber) {
      initialValue = Number(queryParam);
    } else {
      initialValue = queryParam;
    }
  } else {
    initialValue = defaultValue;
  }
  return useState(initialValue);
};

export default useQueryState;
