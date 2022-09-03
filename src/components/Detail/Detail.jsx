import RenderIf from 'components/RenderIf/RenderIf';
import React from 'react';
import styles from './Detail.module.css';

const Detail = ({ detail, subField, Icon }) => {
  return (
    <>
      <RenderIf isTrue={detail[subField]}>
        <div className={styles.content}>
          {Icon}
          <p>{detail[subField]}</p>
        </div>
      </RenderIf>
    </>
  );
};

export default Detail;
