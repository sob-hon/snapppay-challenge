import React from 'react';

export const getPaginationGenerator = (
  currentPageNumber,
  totalPageNumber,
  offset = 2,
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
  // const pageNumbers = [...Array(totalPages + 1).keys()].slice(1);
  const pageNumbers = [...Array(totalPages).keys()].slice(1);

  const nextPageBtnClickedHandler = () => {
    if (skip !== totalPages) {
      setSkip(prevPage => prevPage + 1);
      // setCurrentPage(currentPage + 1);
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
    <div>
      <button onClick={prevPageBtnClickedHandler}>prev</button>
      {getPaginationGenerator(skip, totalPages).map((pageNumber, index) => {
        if (pageNumber !== '...') {
          return (
            <span
              key={index}
              onClick={() => pageNumberClickedHandler(pageNumber)}
            >
              {pageNumber}
            </span>
          );
        } else {
          return <span key={index}>{pageNumber}</span>;
        }
      })}

      <button onClick={nextPageBtnClickedHandler}>next</button>
    </div>
  );
};

export default Pagination;
