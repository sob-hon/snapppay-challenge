import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Contacts from '../../components/Contacts/Contacts';
import Loading from '../../components/Loading/Loading';
import useInitialOptions from '../../hooks/useInitialOptions';
import useDebounce from '../../hooks/useDebounce';
import { useRecentlyVisitedContacts } from '../../context/recentContactsContext';
import styles from './Homepage.module.css';
import Pagination from '../../components/Pagination/Pagination';
import Contact from 'components/Contact/Contact';
import { client } from 'utils/client';
import { RadioButton } from 'components/Form/RadioButton/RadioButton';

// absolute import ✅
// useReducer if router doesn't works
// add skip to fetch from url
// add custom api function ✅
// add localStorage utility ✅
// useFetch hook
// create custom components
// handle first site visit
// change ui styles
// make radio input & label a separate component
// add recently visited contacts to local storage

const Homepage = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState();
  const navigate = useNavigate();
  const {
    initialSearchOption,
    initialSearchValue,
    initialOrder,
    initialCurrentPage,
  } = useInitialOptions();
  const [sortOrder, setSortOrder] = useState(initialOrder);
  const [selectedOption, setSelectedOption] = useState(initialSearchOption);
  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);
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
    console.log('current page: ', currentPage);
    setLoading(true);
    const query = `?where={"${selectedOption}":{"contains":"${debouncedValue}"}}&sort=createdAt ${sortOrder}&limit=30&skip=${
      currentPage - 1
    }`;
    const data = await client('passenger/' + query);
    setLoading(false);
    navigate(query);
    setContacts(data.items);
    setCurrentPage(data.meta.skipped + 1);
    setTotal(data.meta.total);
  };

  useEffect(() => {
    getSearchResult();
    // eslint-disable-next-line
  }, [selectedOption, debouncedValue, sortOrder, currentPage]);

  return (
    <>
      <div className={styles.searchWrapper}>
        <form className={styles.searchTypeWrapper}>
          <RadioButton
            id="firstName"
            value="first_name"
            checked={selectedOption === 'first_name'}
            onChange={optionChangeHandler}
            label={'First Name'}
          />
          <RadioButton
            id="lastName"
            value="last_name"
            checked={selectedOption === 'last_name'}
            onChange={optionChangeHandler}
            label={'Last Name'}
          />
          <RadioButton
            id="phoneNumber"
            value="phone"
            checked={selectedOption === 'phone'}
            onChange={optionChangeHandler}
            label={'Phone Number'}
          />
        </form>
        <input
          type="text"
          value={searchValue}
          onChange={searchValueChangeHandler}
        />
        <form className={styles.orderTypeWrapper}>
          <RadioButton
            id="ascending"
            value="ASC"
            checked={sortOrder === 'ASC'}
            onChange={sortOptionChangedHandler}
            label={'Ascending'}
          />
          <RadioButton
            id="descending"
            value="DESC"
            checked={sortOrder === 'DESC'}
            onChange={sortOptionChangedHandler}
            label={'Descending'}
          />
        </form>
      </div>
      {recentContactsContext.recentlyVisitedContacts.length !== 0 ? (
        <>
          <h2 className={styles.recentlyVisitedHeader}>
            Recently Visited Contacts
          </h2>
          <div className={styles.recentlyVisitedWrapper}>
            {recentContactsContext.recentlyVisitedContacts.map(
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

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={total}
      />
    </>
  );
};

export default Homepage;
