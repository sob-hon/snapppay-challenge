import React, { useState } from "react";
import styles from "./Homepage.module.css";

const Homepage = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const searchValueChangeHandler = (event) => {
    setSearchValue(event.target.value);
  };

  const handleOptionChange = (event) => {
    console.log("options value: ", event.target.value);
    setSelectedOption(event.target.value);
  };

  console.log(selectedOption);

  return (
    <div className={styles.SearchWrapper}>
      <form className={styles.searchTypeWrapper}>
        <div>
          <input
            type="radio"
            id="firstName"
            name="radio-group"
            value="firstName"
            checked={selectedOption === "firstName"}
            onChange={handleOptionChange}
          />
          <label htmlFor="firstName">First Name</label>
        </div>
        <div>
          <input
            type="radio"
            id="lastName"
            value="lastName"
            name="radio-group"
            checked={selectedOption === "lastName"}
            onChange={handleOptionChange}
          />
          <label htmlFor="lastName">Last Name</label>
        </div>
        <div>
          <input
            type="radio"
            id="phoneNumber"
            value="phoneNumber"
            name="radio-group"
            checked={selectedOption === "phoneNumber"}
            onChange={handleOptionChange}
          />
          <label htmlFor="phoneNumber">Phone Number</label>
        </div>
      </form>
      <input
        type="text"
        value={searchValue}
        onChange={searchValueChangeHandler}
      />
    </div>
  );
};

export default Homepage;
