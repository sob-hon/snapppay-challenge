import React from 'react';
import styles from './Pagination.module.css';

export const getPaginationGenerator = (
  currentPageNumber,
  totalPageNumber,
  offset = 3,
) => {
  // By doing this, when we are close to the beginning or end of the pagination, two numbers are generated after/before the current page,
  // but when we are far from these points (in the middle of the pagination), we generate only one number after/before the current page.
  const offsetNumber =
    currentPageNumber <= offset || currentPageNumber > totalPageNumber - offset
      ? offset
      : offset - 1;
  const numbersList = [];
  const numbersListWithDots = [];

  // If itemsPerPage is less than what the user selected with the Select component or if there is no page or only one page:
  if (totalPageNumber <= 1 || totalPageNumber === undefined) return [1];

  // Create list of numbers:
  numbersList.push(1);
  for (
    let i = currentPageNumber - offsetNumber;
    i <= currentPageNumber + offsetNumber;
    i++
  ) {
    if (i < totalPageNumber && i > 1) {
      numbersList.push(i);
    }
  }
  numbersList.push(totalPageNumber);

  // Add three dots to the list of numbers:
  numbersList.reduce((accumulator, currentValue) => {
    if (accumulator === 1) {
      numbersListWithDots.push(accumulator);
    }
    if (currentValue - accumulator !== 1) {
      numbersListWithDots.push('...');
    }
    numbersListWithDots.push(currentValue);

    return currentValue;
  });

  return numbersListWithDots;
};

const Pagination = ({ skip, setSkip, totalData, dataPerPage = 30 }) => {
  const totalPages = Math.ceil(totalData / dataPerPage);

  const nextPageBtnClickedHandler = () => {
    if (skip !== totalPages) {
      setSkip(prevPage => prevPage + 1);
    }
  };

  const prevPageBtnClickedHandler = () => {
    if (skip !== 1) {
      setSkip(prevPage => prevPage - 1);
    }
  };

  const pageNumberClickedHandler = pageNumber => {
    setSkip(pageNumber);
  };

  return (
    <div className={styles.paginationWrapper}>
      <button
        className={styles.paginateBtn}
        onClick={prevPageBtnClickedHandler}
      >
        <span>{'<'}</span>
      </button>
      {getPaginationGenerator(skip, totalPages).map((pageNumber, index) => {
        if (pageNumber !== '...') {
          return (
            <span
              key={index}
              className={`${styles.pageNumber} ${
                skip === pageNumber ? styles.pageNumberActive : ''
              }`}
              onClick={() => pageNumberClickedHandler(pageNumber)}
            >
              {pageNumber}
            </span>
          );
        } else {
          return <span key={index}>{pageNumber}</span>;
        }
      })}

      <button
        className={styles.paginateBtn}
        onClick={nextPageBtnClickedHandler}
      >
        <span>{'>'}</span>
      </button>
    </div>
  );
};

export default Pagination;
