import React from 'react';
import styles from './Error.module.css';
import { MdErrorOutline } from 'react-icons/md';

const Error = () => {
  return (
    <div className={styles.errorWrapper}>
      <MdErrorOutline />
      <p className={styles.errorText}>Sorry something went wrong</p>
    </div>
  );
};

export default Error;
