import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Contacts from "../../components/Contacts/Contacts";
import Loading from "../../components/Loading/Loading";
import useInitialOptions from "../../hooks/useInitialOptions";
import useDebounce from "../../hooks/useDebounce";
import styles from "./Homepage.module.css";

const Homepage = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState();
  const navigate = useNavigate();
  const { initialSearchOption, initialSearchValue, initialOrder } =
    useInitialOptions();
  const [sortOrder, setSortOrder] = useState(initialOrder);
  const [selectedOption, setSelectedOption] = useState(initialSearchOption);
  const [searchValue, setSearchValue] = useState(initialSearchValue);

  const debouncedValue = useDebounce(searchValue, 500);

  const searchValueChangeHandler = (event) => {
    setSearchValue(event.target.value);
  };

  const optionChangeHandler = (event) => {
    setSelectedOption(event.target.value);
  };

  const sortOptionChangedHandler = (event) => {
    setSortOrder(event.target.value);
  };

  const getSearchResult = async () => {
    setLoading(true);
    let query = `http://localhost:1337/passenger/?where={"${selectedOption}":{"contains":"${debouncedValue}"}}&sort=createdAt ${sortOrder}&limit=30`;
    const response = await fetch(query);
    const data = await response.json();
    setLoading(false);
    navigate(query.slice(22));
    setContacts(data.items);
  };

  useEffect(() => {
    getSearchResult();
    // eslint-disable-next-line
  }, [selectedOption, debouncedValue, sortOrder]);

  return (
    <>
      <div className={styles.searchWrapper}>
        <form className={styles.searchTypeWrapper}>
          <div>
            <input
              type="radio"
              id="firstName"
              name="radio-group"
              value="first_name"
              checked={selectedOption === "first_name"}
              onChange={optionChangeHandler}
            />
            <label htmlFor="firstName">First Name</label>
          </div>
          <div>
            <input
              type="radio"
              id="lastName"
              value="last_name"
              name="radio-group"
              checked={selectedOption === "last_name"}
              onChange={optionChangeHandler}
            />
            <label htmlFor="lastName">Last Name</label>
          </div>
          <div>
            <input
              type="radio"
              id="phoneNumber"
              value="phone"
              name="radio-group"
              checked={selectedOption === "phone"}
              onChange={optionChangeHandler}
            />
            <label htmlFor="phoneNumber">Phone Number</label>
          </div>
        </form>
        <input
          type="text"
          value={searchValue}
          onChange={searchValueChangeHandler}
        />
        <form className={styles.orderTypeWrapper}>
          <div>
            <input
              type="radio"
              id="ascending"
              name="radio-group"
              value="ASC"
              checked={sortOrder === "ASC"}
              onChange={sortOptionChangedHandler}
            />
            <label htmlFor="ascending">Ascending</label>
          </div>
          <div>
            <input
              type="radio"
              id="descending"
              value="DESC"
              name="radio-group"
              checked={sortOrder === "DESC"}
              onChange={sortOptionChangedHandler}
            />
            <label htmlFor="descending">Descending</label>
          </div>
        </form>
      </div>

      {loading ? (
        <Loading />
      ) : contacts?.length === 0 ? (
        <div className={styles.notFound}>
          Not found contacts with desired inputs
        </div>
      ) : (
        <Contacts contacts={contacts} />
      )}
    </>
  );
};

export default Homepage;
