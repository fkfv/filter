import React from 'react';

import {css} from '@emotion/css';

import TabList from './tab-list';
import TabPanel from './tab-panel';
import Tab from './tab';


const TabsStyle = css({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
});

const Tabs: React.FunctionComponent = ({
  children,
  ...props
}) => {
  return (
    <div
      className={TabsStyle}
      {...props}
    >
      {children}
    </div>
  );
};

export {Tabs, TabList, TabPanel, Tab};
