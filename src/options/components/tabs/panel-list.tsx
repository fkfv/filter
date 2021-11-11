import React from 'react';

import {css} from '@emotion/css';


const PanelListStyle = css({
  border: '1px solid #000000',
  borderTop: '0',
  borderBottomLeftRadius: '2px',
  borderBottomRightRadius: '2px',
  padding: '10px'
});

const PanelList: React.FunctionComponent = ({
  children
}) => {
  return (
    <div
      className={PanelListStyle}
    >
      {children}
    </div>
  );
};

export default PanelList;
