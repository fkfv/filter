import React from 'react';

import {css} from '@emotion/css';


const BodyStyle = css({
  height: '100%',
  display: 'flex'
});

const Body = ({
  children
}: React.PropsWithChildren<{}>) => {
  return (
    <div
      className={BodyStyle}
    >
      {children}
    </div>
  );
};

export default Body;
