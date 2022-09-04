import { client } from 'utils/client';
import useDebounce from 'hooks/useDebounce';
import { useNavigate } from 'react-router-dom';
import HomeForm from 'components/HomeForm/HomeForm';
import Loading from 'components/Loading/Loading';
import useFirstRender from 'hooks/useFirstRender';
import React, { useEffect, useState } from 'react';
import Contacts from 'components/Contacts/Contacts';
import NotFound from 'components/NotFound/NotFound';
import RenderIf from 'components/RenderIf/RenderIf';
import useInitialOptions from 'hooks/useInitialOptions';
import Pagination from 'components/Pagination/Pagination';
import RecentlyVisitedContacts from 'components/RecentlyVisitedContacts/RecentlyVisitedContacts';
import useFetch from 'hooks/useFetch';

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
  const navigate = useNavigate();
  const { initialSearchOption, initialSearchValue, initialOrder, initialSkip } =
    useInitialOptions();
  const [sortOrder, setSortOrder] = useState(initialOrder);
  const [selectedOption, setSelectedOption] = useState(initialSearchOption);
  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const [skip, setSkip] = useState(initialSkip);
  const firstRender = useFirstRender();
  const debouncedValue = useDebounce(searchValue, 500);

  const getSearchResult = async () => {
    const query = `?where={"${selectedOption}":{"contains":"${debouncedValue}"}}&sort=createdAt ${sortOrder}&limit=36&skip=`;
    if (!firstRender) {
      navigate(query + skip);
    }
    return client('passenger/' + query + (skip - 1) * 36);
  };

  const { data, loading, error } = useFetch(getSearchResult);

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

      <RenderIf isTrue={loading}>
        <Loading />
      </RenderIf>

      <RenderIf isTrue={data?.items?.length === 0}>
        <NotFound />
      </RenderIf>

      <RenderIf isTrue={!(loading && data?.items?.length === 0)}>
        <Contacts contacts={data?.items} />
      </RenderIf>

      <RenderIf isTrue={data?.items?.length !== 0 && !loading}>
        <Pagination
          setSkip={setSkip}
          skip={skip}
          totalData={data?.meta?.total}
        />
      </RenderIf>
    </>
  );
};

export default Homepage;
