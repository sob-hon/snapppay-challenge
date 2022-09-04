import React from 'react';
const RenderIf = ({ children, renderCondition }) => {
  return <>{renderCondition ? children : ''}</>;
};

export default RenderIf;
