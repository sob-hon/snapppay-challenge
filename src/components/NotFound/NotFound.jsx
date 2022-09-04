import React from 'react';
import styles from './NotFound.module.css';

const NotFound = ({ text }) => {
  return <div className={styles.notFound}>{text}</div>;
};

export default NotFound;
