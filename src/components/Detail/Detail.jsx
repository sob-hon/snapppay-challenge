import React from 'react';
import styles from './Detail.module.css';

const Detail = ({ detail, subField, Icon }) => {
  return (
    <>
      {detail[subField] ? (
        <div className={styles.content}>
          {Icon}
          <p>{detail[subField]}</p>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Detail;
