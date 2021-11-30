import React from 'react';

import {css} from '@emotion/css';


const GroupStyle = css({
  display: 'flex',
  width: '100%',
  paddingTop: '10px',
  alignItems: 'center'
});

const Group = ({
  children
}: React.PropsWithChildren<{}>) => {
  return (
    <div
      className={GroupStyle}
    >
      {children}
    </div>
  );
};

export default Group;
