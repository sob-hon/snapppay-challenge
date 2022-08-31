import React, { useEffect, useState } from "react";
import Contacts from "../../components/Contacts/Contacts";
import styles from "./Homepage.module.css";

const Homepage = () => {
  const [selectedOption, setSelectedOption] = useState("first_name");
  const [searchValue, setSearchValue] = useState("");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [contacts, setContacts] = useState([]);

  const searchValueChangeHandler = (event) => {
    setSearchValue(event.target.value);
  };

  const optionChangeHandler = (event) => {
    console.log("options value: ", event.target.value);
    setSelectedOption(event.target.value);
  };

  const sortOptionChangedHandler = (event) => {
    console.log("sort option value: ", event.target.value);
    setSortOrder(event.target.value);
  };

  const getSearchResult = async () => {
    let query = `http://localhost:1337/passenger/?where={"${selectedOption}":{"contains":"${searchValue}"}}&sort=createdAt ${sortOrder}&limit=30`;
    const response = await fetch(query);
    const data = await response.json();
    setContacts(data.items);
  };

  console.log("contacts are: ", contacts);

  useEffect(() => {
    getSearchResult();
  }, [selectedOption, searchValue, sortOrder]);

  return (
    <>
      <div className={styles.SearchWrapper}>
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
      <Contacts contacts={contacts}/>
    </>
  );
};

export default Homepage;
