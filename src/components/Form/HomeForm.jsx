import { RadioButton } from 'components/RadioButton/RadioButton';
import React from 'react';
import styles from './HomeForm.module.css';

const HomeForm = ({
  selectedOption,
  optionChangeHandler,
  searchValue,
  searchValueChangeHandler,
  sortOrder,
  sortOptionChangedHandler,
}) => {
  return (
    <div className={styles.formWrapper}>
      <div className={styles.searchTypeWrapper}>
        <RadioButton
          id="firstName"
          value="first_name"
          checked={selectedOption === 'first_name'}
          onChange={optionChangeHandler}
          label={'First Name'}
          name={'field-of-search'}
          className={styles.firstNameInput}
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
        className={styles.searchTextInput}
        placeholder="Search ..."
      />
      <div className={styles.orderTypeWrapper}>
        <RadioButton
          id="ascending"
          value="createdAt ASC"
          checked={sortOrder === 'createdAt ASC'}
          onChange={sortOptionChangedHandler}
          label={'Ascending'}
          name={'sort-order'}
        />
        <RadioButton
          id="descending"
          value="createdAt DESC"
          checked={sortOrder === 'createdAt DESC'}
          onChange={sortOptionChangedHandler}
          label={'Descending'}
          name={'sort-order'}
        />
      </div>
    </div>
  );
};

export default HomeForm;
