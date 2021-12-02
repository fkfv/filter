import React from 'react';

import {css} from '@emotion/css';

import ListItem from './list-item';

import {ItemDescription, ItemName, ListDescription} from './item-description';


const ListStyle = css({
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#dedede',
  flexBasis: '35%'
});

const List: React.FunctionComponent = ({
  children
}) => {
  return (
    <div
      className={ListStyle}
    >
      {children}
    </div>
  );
};

export default List;
export {ListItem, ItemDescription, ItemName, ListDescription};
