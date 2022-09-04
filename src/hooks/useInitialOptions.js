import { useSearchParams } from 'react-router-dom';

const useInitialOptions = () => {
  const [searchParams] = useSearchParams();
  const queryParams = JSON.parse(searchParams.get('where'));

  if (!queryParams)
    return {
      initialSearchOption: 'first_name',
      initialSearchValue: '',
    };

  const initialSearchOption = Object.keys(
    JSON.parse(searchParams.get('where')),
  )[0];
  const initialSearchValue = JSON.parse(searchParams.get('where'))[
    initialSearchOption
  ]['contains'];

  return {
    initialSearchOption,
    initialSearchValue,
  };
};

export default useInitialOptions;
