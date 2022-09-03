import { client } from 'utils/client';
import styles from './Homepage.module.css';
import useDebounce from 'hooks/useDebounce';
import { useNavigate } from 'react-router-dom';
import HomeForm from 'components/Form/HomeForm';
import Contact from 'components/Contact/Contact';
import Loading from 'components/Loading/Loading';
import React, { useEffect, useState } from 'react';
import Contacts from 'components/Contacts/Contacts';
import useInitialOptions from 'hooks/useInitialOptions';
import Pagination from 'components/Pagination/Pagination';
import { useRecentlyVisitedContacts } from 'context/recentContactsContext';
import { shouldChangeUrl } from 'utils/shouldChangeUrl';

// useReducer if router doesn't work
// handle first site visit
// useFetch hook
// create custom components
// change ui styles
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
  const recentContactsContext = useRecentlyVisitedContacts();

  const debouncedValue = useDebounce(searchValue, 500);

  const searchValueChangeHandler = event => {
    setSearchValue(event.target.value);
  };

  const optionChangeHandler = event => {
    setSelectedOption(event.target.value);
  };

  const sortOptionChangedHandler = event => {
    setSortOrder(event.target.value);
  };

  const getSearchResult = async () => {
    setLoading(true);
    const query = `?where={"${selectedOption}":{"contains":"${debouncedValue}"}}&sort=createdAt ${sortOrder}&limit=30&skip=`;
    const data = await client('passenger/' + query + (skip - 1) * 30);
    setLoading(false);
    shouldChangeUrl(
      initialSearchOption,
      initialSearchValue,
      initialOrder,
      initialSkip,
    ) || navigate(query + skip);
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

      {recentContactsContext.recentlyVisitedContacts?.length !== 0 ? (
        <>
          <h2 className={styles.recentlyVisitedHeader}>
            Recently Visited Contacts
          </h2>
          <div className={styles.recentlyVisitedWrapper}>
            {recentContactsContext?.recentlyVisitedContacts?.map(
              recentContact => (
                <Contact key={recentContact.id} contact={recentContact} />
              ),
            )}
          </div>
        </>
      ) : (
        ''
      )}

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
