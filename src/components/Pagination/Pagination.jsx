import React, { useState } from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ currentPage, setCurrentPage, total }) => {
  const totalPages = Math.floor(total / 30) === 0 ? 1 : Math.floor(total / 30); // refactor this with data from server
  const pageNumberLimit = 3;
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);

  const onPageChange = (pageNumber) => {
    console.log("page number: ", pageNumber);
    setCurrentPage(pageNumber);
  };

  const prevBtnClickedHandler = () => {
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageLimit(maxPageLimit - pageNumberLimit);
      setMinPageLimit(minPageLimit - pageNumberLimit);
    }
    setCurrentPage((prev) => prev - 1);
  };

  const nextBtnClickedHandler = () => {
    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pageNumberLimit);
      setMinPageLimit(minPageLimit + pageNumberLimit);
    }
    setCurrentPage((prev) => prev + 1);
  };

  const pageNumberClickedHandler = (event) => {
    onPageChange(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const pageNumbers = pages.map((page) => {
    if (page <= maxPageLimit && page > minPageLimit) {
      return (
        <li
          key={page}
          id={page}
          onClick={pageNumberClickedHandler}
          className={
            styles.pageNumber + " " + currentPage === page ? styles.active : ""
          }
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
          <button
            onClick={prevBtnClickedHandler}
            disabled={currentPage === pages[0]}
          >
            Prev
          </button>
        </li>
        {pageNumbers}
        <li>
          <button
            onClick={nextBtnClickedHandler}
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
