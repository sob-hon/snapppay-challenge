import { client } from 'utils/client';
import useDebounce from 'hooks/useDebounce';
import { useNavigate } from 'react-router-dom';
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

// useReducer if router doesn't work
// handle first site visit
// useFetch hook
// create custom components ✅
// change ui styles => card style
// add skip to fetch from url ✅
// add localStorage utility ✅
// add recently visited contacts to local storage ✅
// add custom api function ✅
// make radio input & label a separate component ✅
// absolute import ✅

const Homepage = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState();
  const navigate = useNavigate();
  const { initialSearchOption, initialSearchValue, initialOrder, initialSkip } =
    useInitialOptions();
  const [sortOrder, setSortOrder] = useState(initialOrder);
  const [selectedOption, setSelectedOption] = useState(initialSearchOption);
  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const [skip, setSkip] = useState(initialSkip);
  const [total, setTotal] = useState(1);
  const firstRender = useFirstRender();

  const debouncedValue = useDebounce(searchValue, 500);

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

  console.log('first:', firstRender);

  const getSearchResult = async () => {
    setLoading(true);
    const query = `?where={"${selectedOption}":{"contains":"${debouncedValue}"}}&sort=createdAt ${sortOrder}&limit=36&skip=`;
    const data = await client('passenger/' + query + (skip - 1) * 36);
    console.log(data);
    setLoading(false);
    if (!firstRender) {
      navigate(query + skip);
    }
    setContacts(data.items);
    setTotal(data.meta.total);
  };

  useEffect(() => {
    getSearchResult();
    // eslint-disable-next-line
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

      <RenderIf isTrue={contacts?.length === 0}>
        <NotFound />
      </RenderIf>

      <RenderIf isTrue={!(loading && contacts?.length === 0)}>
        <Contacts contacts={contacts} />
      </RenderIf>

      <RenderIf isTrue={contacts?.length !== 0}>
        <Pagination setSkip={setSkip} skip={skip} totalData={total} />
      </RenderIf>
    </>
  );
};

export default Homepage;
