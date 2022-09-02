import React from 'react';
import styles from "./Form.module.css"

const Form = ({ children }) => {
  return <div className={styles.formWrapper}>{children}</div>;
};

export default Form;
