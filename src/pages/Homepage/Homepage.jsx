import { client } from 'utils/client';
import styles from './Homepage.module.css';
import useDebounce from 'hooks/useDebounce';
import { useNavigate } from 'react-router-dom';
import HomeForm from 'components/Form/HomeForm';
import Loading from 'components/Loading/Loading';
import React, { useEffect, useState } from 'react';
import Contacts from 'components/Contacts/Contacts';
import useInitialOptions from 'hooks/useInitialOptions';
import Pagination from 'components/Pagination/Pagination';
import { shouldChangeUrl } from 'utils/shouldChangeUrl';
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

  const getSearchResult = async () => {
    setLoading(true);
    const query = `?where={"${selectedOption}":{"contains":"${debouncedValue}"}}&sort=createdAt ${sortOrder}&limit=36&skip=`;
    const data = await client('passenger/' + query + (skip - 1) * 36);
    setLoading(false);
    if (
      shouldChangeUrl(
        initialSearchOption,
        initialSearchValue,
        initialOrder,
        initialSkip,
      )
    ) {
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

      {loading ? (
        <Loading />
      ) : contacts?.length === 0 ? (
        <div className={styles.notFound}>
          Not found contacts with desired inputs
        </div>
      ) : (
        <Contacts contacts={contacts} />
      )}
      {contacts?.length !== 0 ? (
        <Pagination setSkip={setSkip} skip={skip} totalData={total} />
      ) : (
        ''
      )}
    </>
  );
};

export default Homepage;
