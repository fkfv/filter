import React from 'react';

import {css, cx} from '@emotion/css';


type TabProps = {
  active: boolean;
  onClick: ((e: React.SyntheticEvent) => void);
};

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

const Tab = ({
  children,
  active,
  ...props
}: React.PropsWithChildren<TabProps>) => {
  const styles = cx({
    [TabStyle]: true,
    [ActiveTabStyle]: active
  })

  return (
    <li
      className={styles}
      {...props}
    >
      <a>{children}</a>
    </li>
  );
};

export default Tab;
