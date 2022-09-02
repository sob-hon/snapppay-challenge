import React, { Children } from 'react';

const Form = ({ children, style }) => {
  return <div className={style}>{children}</div>;
};

export default Form;
