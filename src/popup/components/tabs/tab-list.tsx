import React from 'react';

import {css} from '@emotion/css';
import {TabList as ReactTabList} from 'react-tabs';


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
    <ReactTabList
      className={TabListStyle}
      {...props}
    >
      {children}
    </ReactTabList>
  );
}

// @ts-ignore
TabList.tabsRole = 'TabList';

export default TabList;
