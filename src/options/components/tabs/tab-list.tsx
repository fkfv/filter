import React from 'react';

import {css} from '@emotion/css';
import {TabList as ReactTabList} from 'react-tabs';


const TabListStyle = css({
  listStyleType: 'none',
  border: '1px solid #000000',
  borderBottom: '2px solid rgba(212, 212, 212, 0.7)',
  borderTopLeftRadius: '2px',
  borderTopRightRadius: '2px',
  padding: '5px',
  paddingBottom: '0',
  display: 'flex',
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
