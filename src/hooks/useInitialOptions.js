import { useSearchParams } from 'react-router-dom';

const useInitialOptions = () => {
  const [searchParams] = useSearchParams();
  const queryParams = JSON.parse(searchParams.get('where'));
  if (!queryParams)
    return {
      initialSearchOption: 'first_name',
      initialSearchValue: '',
      initialOrder: 'ASC',
      initialCurrentPage: 1,
    };
  const initialSearchOption = Object.keys(
    JSON.parse(searchParams.get('where')),
  )[0];
  const initialSearchValue = JSON.parse(searchParams.get('where'))[
    initialSearchOption
  ]['contains'];
  const initialOrder = searchParams.get('sort').slice(10);
  const initialCurrentPage = Number(searchParams.get('skip'));
  return {
    initialSearchOption,
    initialSearchValue,
    initialOrder,
    initialCurrentPage,
  };
};

export default useInitialOptions;
