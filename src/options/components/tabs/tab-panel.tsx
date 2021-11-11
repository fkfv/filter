import React from 'react';

import {css} from '@emotion/css';
import {TabPanel as ReactTabPanel} from 'react-tabs';


const TabPanelStyle = css({
  display: 'none'
});

const ActiveTabPanelStyle = css({
  display: 'flex'
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
