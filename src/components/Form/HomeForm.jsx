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
    </div>
  );
};

export default HomeForm;
