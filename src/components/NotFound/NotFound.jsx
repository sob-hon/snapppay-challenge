import React from 'react';
import { TbError404 } from 'react-icons/tb';
import styles from './NotFound.module.css';

const NotFound = ({ text }) => {
  return (
    <div className={styles.notFound}>
      <TbError404 />
      <p className={styles.notFoundText}>{text}</p>
    </div>
  );
};

export default NotFound;
