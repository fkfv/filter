import React from 'react';

import {css} from '@emotion/css';


const ItemStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  border: '1px solid #eeeeee',
  margin: '2px 0',
  paddingLeft: '10px'
});

const Item = ({
  children
}: React.PropsWithChildren<{}>) => {
  return (
    <li
      className={ItemStyle}
    >
      {children}
    </li>
  );
};

export default Item;
