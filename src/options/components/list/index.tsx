import React from 'react';

import {css} from '@emotion/css';

import ListItem from './list-item';
import ListControls from './list-controls';
import Action from './action';

import {ItemDescription, ItemName, ListDescription} from './item-description';


const ListStyle = css({
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#dedede',
  flexBasis: '20%'
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
export {ListItem, ListControls, ItemDescription, ItemName, ListDescription,
  Action};
