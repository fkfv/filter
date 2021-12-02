import React from 'react';

import {css} from '@emotion/css';
import {Tab as ReactTab} from 'react-tabs';


const TabStyle = css({
  display: 'flex',
  padding: '0 10px',
  borderRight: '1px solid #ebebeb',
  height: '100%',
  alignItems: 'center',
  cursor: 'pointer',

  '& > a': {
    color: '#ffffff',
    textDecoration: 'none'
  }
});

const ActiveTabStyle = css({
  background: '#ffffff',

  '& > a': {
    color: '#999999'
  },
});

const Tab: React.FunctionComponent = ({
  children,
  ...props
}) => {
  return (
    <ReactTab
      className={TabStyle}
      selectedClassName={ActiveTabStyle}
      {...props}
    >
      <a>{children}</a>
    </ReactTab>
  );
};

// @ts-ignore
Tab.tabsRole = 'Tab';

export default Tab;
