import React from 'react';
const RenderIf = ({ children, isTrue }) => {
  return <>{isTrue ? children : ''}</>;
};

export default RenderIf;
