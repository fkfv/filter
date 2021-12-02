import React from 'react';

import {css} from '@emotion/css';


const TabListStyle = css({
  padding: '0',
  paddingRight: '20px',
  display: 'flex',
  fontWeight: 300,
  alignItems: 'center',
  listStyleType: 'none',
  fontSize: '1.5em',
  backgroundColor: '#999999',
  color: '#f0f0f0',
  flexBasis: '65%'
});

const TabList: React.FunctionComponent = ({
  children,
  ...props
}) => {
  return (
    <ul
      className={TabListStyle}
      {...props}
    >
      {children}
    </ul>
  );
};

export default TabList;
