import React from 'react';

import {css} from '@emotion/css';
import {Tabs as ReactTabs} from 'react-tabs';

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
    <ReactTabs
      className={TabsStyle}
      {...props}
    >
      {children}
    </ReactTabs>
  );
};

// @ts-ignore
Tabs.tabsRole = 'Tabs';

export {Tabs, TabList, TabPanel, Tab};
