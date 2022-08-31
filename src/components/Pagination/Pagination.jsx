import React from "react";
import styles from "./Pagination.module.css";

const Pagination = () => {
  const {
    currentPage,
    maxPageLimit,
    minPageLimit,
    response,
    onPrevClick,
    onNextClick,
    onPageChange,
  } = props;
  const totalPages = response.totalPages - 1;
  const data = response.data;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePrevClick = () => {
    onPrevClick();
  };

  const handleNextClick = () => {
    onNextClick();
  };

  const handlePageClick = (e) => {
    onPageChange(Number(e.target.id));
  };

  const pageNumbers = pages.map((page) => {
    if (page <= maxPageLimit && page > minPageLimit) {
      return (
        <li
          key={page}
          id={page}
          onClick={handlePageClick}
          className={currentPage === page ? "active" : null}
        >
          {page}
        </li>
      );
    } else {
      return null;
    }
  });
  return (
    <div className={styles.main}>
      <ul className={styles.pageNumbers}>
        <li>
          <button onClick={handlePrevClick} disabled={currentPage === pages[0]}>
            Prev
          </button>
        </li>
        {pageNumbers}
        <li>
          <button
            onClick={handleNextClick}
            disabled={currentPage === pages[pages.length - 1]}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
