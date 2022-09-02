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
import { RadioButton } from 'components/RadioButton/RadioButton';
import Form from 'components/Form/Form';

// useReducer if router doesn't works
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
  const { initialSearchOption, initialSearchValue, initialOrder } =
    useInitialOptions();
  const [sortOrder, setSortOrder] = useState(initialOrder);
  const [selectedOption, setSelectedOption] = useState(initialSearchOption);
  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const [skip, setSkip] = useState(1);
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
    const query = `?where={"${selectedOption}":{"contains":"${debouncedValue}"}}&sort=createdAt ${sortOrder}&limit=30&skip=${skip}`;
    const sedQuery = `?where={"${selectedOption}":{"contains":"${debouncedValue}"}}&sort=createdAt ${sortOrder}&limit=30&skip=${
      (skip - 1) * 30
    }`;

    const data = await client('passenger/' + sedQuery);
    setLoading(false);
    navigate(query);
    setContacts(data.items);
    setTotal(data.meta.total);
  };

  useEffect(() => {
    getSearchResult();
    // eslint-disable-next-line
  }, [selectedOption, debouncedValue, sortOrder, skip]);

  return (
    <>
      <Form className={styles.searchWrapper}>
        <div className={styles.searchTypeWrapper}>
          <RadioButton
            id="firstName"
            value="first_name"
            checked={selectedOption === 'first_name'}
            onChange={optionChangeHandler}
            label={'First Name'}
            name={'field-of-search'}
          />
          <RadioButton
            id="lastName"
            value="last_name"
            checked={selectedOption === 'last_name'}
            onChange={optionChangeHandler}
            label={'Last Name'}
            name={'field-of-search'}
          />
          <RadioButton
            id="phoneNumber"
            value="phone"
            checked={selectedOption === 'phone'}
            onChange={optionChangeHandler}
            label={'Phone Number'}
            name={'field-of-search'}
          />
        </div>
        <input
          type="text"
          value={searchValue}
          onChange={searchValueChangeHandler}
        />
        <div className={styles.orderTypeWrapper}>
          <RadioButton
            id="ascending"
            value="ASC"
            checked={sortOrder === 'ASC'}
            onChange={sortOptionChangedHandler}
            label={'Ascending'}
            name={'sort-order'}
          />
          <RadioButton
            id="descending"
            value="DESC"
            checked={sortOrder === 'DESC'}
            onChange={sortOptionChangedHandler}
            label={'Descending'}
            name={'sort-order'}
          />
        </div>
      </Form>

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
