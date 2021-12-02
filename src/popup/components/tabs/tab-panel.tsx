import React from 'react';

import {css} from '@emotion/css';


const TabPanelStyle = css({
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
    <div
      className={TabPanelStyle}
      {...props}
    >
      {children}
    </div>
  );
};

export default TabPanel;
