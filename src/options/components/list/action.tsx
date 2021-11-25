import React from 'react';

import {css} from '@emotion/css';


const ActionStyle = css({
  display: 'flex',
  margin: '15px 0',
  padding: '4px',
  alignItems: 'center',
  background: '#f0f0f0',
  border: '1px solid #f0f0f0',
  borderRadius: '2px'
});

const Action: React.FunctionComponent = ({
  children
}) => {
  return (
    <div
      className={ActionStyle}
    >
      {children}
    </div>
  );
};

export default Action;