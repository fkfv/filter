import React from 'react';

import {css} from '@emotion/css';


const DialogBodyStyle = css({
  backgroundColor: '#ffffff',
  padding: '5px'
});

const DialogBody: React.FunctionComponent = ({
  children
}) => {
  return (
    <div
      className={DialogBodyStyle}
    >
      {children}
    </div>
  );
};

export default DialogBody;
