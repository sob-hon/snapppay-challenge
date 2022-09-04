import { client } from 'utils/client';
import useDebounce from 'hooks/useDebounce';
import { useNavigate, useSearchParams } from 'react-router-dom';
import HomeForm from 'components/Form/HomeForm';
import Loading from 'components/Loading/Loading';
import useFirstRender from 'hooks/useFirstRender';
import React, { useEffect, useState } from 'react';
import Contacts from 'components/Contacts/Contacts';
import NotFound from 'components/NotFound/NotFound';
import RenderIf from 'components/RenderIf/RenderIf';
import useInitialOptions from 'hooks/useInitialOptions';
import Pagination from 'components/Pagination/Pagination';
import RecentlyVisitedContacts from 'components/RecentlyVisitedContacts/RecentlyVisitedContacts';
import Error from 'components/Error/Error';
import useQueryState from 'hooks/useQueryState';

const DATA_PER_PAGE_LIMIT = 36;

// handle first site visit ✅
// create custom components ✅
// change ui styles => card style
// add skip to fetch from url ✅
// add localStorage utility ✅
// add recently visited contacts to local storage ✅
// add custom api function ✅
// make radio input & label a separate component ✅
// absolute import ✅
// useFetch hook
// useQueryState
// add try and catch

const Homepage = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState(null);
  const [total, setTotal] = useState(1);
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useQueryState('sort', 'createdAt ASC');
  const [skip, setSkip] = useQueryState('skip', 1, { convertToNumber: true });
  const { initialSearchOption, initialSearchValue } = useInitialOptions();
  const [selectedOption, setSelectedOption] = useState(initialSearchOption);
  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const [error, setError] = useState(false);
  const firstRender = useFirstRender();
  const debouncedValue = useDebounce(searchValue, 500);

  const queryGenerator = () => {
    return `?where={"${selectedOption}":{"contains":"${debouncedValue}"}}&sort=${sortOrder}&limit=${DATA_PER_PAGE_LIMIT}&skip=`;
  };

  const shouldRenderPagination = () => {
    return contacts?.length !== 0 && !loading && !error;
  };

  const getSearchResult = async () => {
    try {
      setLoading(true);
      const query = queryGenerator();
      if (!firstRender) {
        navigate(query + skip);
      }
      const data = await client(
        'passenger/' + query + (skip - 1) * DATA_PER_PAGE_LIMIT,
      );
      setContacts(data?.items);
      setTotal(data?.meta?.total);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const searchValueChangeHandler = event => {
    setSearchValue(event.target.value);
    setSkip(1);
  };

  const optionChangeHandler = event => {
    setSelectedOption(event.target.value);
  };

  const sortOptionChangedHandler = event => {
    setSortOrder(event.target.value);
  };

  useEffect(() => {
    getSearchResult();
  }, [selectedOption, debouncedValue, sortOrder, skip]);

  return (
    <>
      <HomeForm
        selectedOption={selectedOption}
        optionChangeHandler={optionChangeHandler}
        searchValue={searchValue}
        searchValueChangeHandler={searchValueChangeHandler}
        sortOrder={sortOrder}
        sortOptionChangedHandler={sortOptionChangedHandler}
      />

      <RecentlyVisitedContacts />

      <RenderIf renderCondition={loading}>
        <Loading />
      </RenderIf>

      <RenderIf renderCondition={contacts?.length === 0}>
        <NotFound text={'Not found contacts with desired inputs'} />
      </RenderIf>

      <RenderIf renderCondition={error}>
        <Error />
      </RenderIf>

      <RenderIf renderCondition={contacts}>
        <Contacts contacts={contacts} />
      </RenderIf>

      <RenderIf renderCondition={shouldRenderPagination()}>
        <Pagination setSkip={setSkip} skip={skip} totalData={total} />
      </RenderIf>
    </>
  );
};

export default Homepage;
