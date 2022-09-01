import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BackBtn.module.css";

export const BackBtn = () => {
  const navigate = useNavigate();

  const goBackBtnClickedHandler = () => {
    navigate(-1);
  };

  return (
    <button className={styles.backBtn} onClick={goBackBtnClickedHandler}>
      &#8249;
    </button>
  );
};
