import React from 'react';
import { getPaginationGenerator } from 'utils/getPaginationGenerator';
import styles from './Pagination.module.css';

const Pagination = ({ skip, setSkip, totalData, dataPerPage = 36 }) => {
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
