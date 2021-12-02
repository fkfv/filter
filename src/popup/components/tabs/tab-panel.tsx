import React from 'react';

import {css} from '@emotion/css';
import {TabPanel as ReactTabPanel} from 'react-tabs';


const TabPanelStyle = css({
  display: 'none'
});

const ActiveTabPanelStyle = css({
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  flexBasis: '65%'
});

const TabPanel: React.FunctionComponent = ({
  children,
  ...props
}) => {
  return (
    <ReactTabPanel
      className={TabPanelStyle}
      selectedClassName={ActiveTabPanelStyle}
      {...props}
    >
      {children}
    </ReactTabPanel>
  );
};

// @ts-ignore
TabPanel.tabsRole = 'TabPanel';

export default TabPanel;
