import React from 'react';

import {css} from '@emotion/css';
import {Tab as ReactTab} from 'react-tabs';


const TabStyle = css({
  padding: '0 10px',
  background: 'rgba(212, 212, 212, 0.7)',
  borderTop: '2px solid rgba(212, 212, 212, 0.7)',
  borderBottom: '2px solid rgba(212, 212, 212, 0.0)',
  borderTopLeftRadius: '2px',
  borderTopRightRadius: '2px',
  display: 'flex',
  alignItems: 'center',

  ':last-of-type': {
    borderRight: '2px solid rgba(212, 212, 212, 0.7)'
  },

  ':not(:last-of-type)': {
    borderLeft: '2px solid rgba(212, 212, 212, 0.7)'
  },

  '&[aria-selected="false"]': {
    borderBottomRightRadius: '2px'
  },

  '& > a': {
    textDecoration: 'none',
    color: '#000000',
    fontSize: '1.2em',
    fontWeight: 300,
    cursor: 'pointer'
  }
});

const ActiveTabStyle = css({
  background: '#ffffff',

  '& + li': {
    borderBottomLeftRadius: '2px'
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
