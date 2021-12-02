import React from 'react';

import {css} from '@emotion/css';

import Item from './item';


const ScrollerStyle = css({
  listStyleType: 'none',
  padding: '5px',
  overflowY: 'scroll',
  display: 'flex',
  flexDirection: 'column',
  height: '70%',
  border: '1px solid #eeeeee'
});

const Scroller = ({
  children
}: React.PropsWithChildren<{}>) => {
  return (
    <ul
      className={ScrollerStyle}
    >
      {children}
    </ul>
  );
};

Scroller.Item = Item;

export {Item};
export default Scroller;
