import React from 'react';

import {css} from '@emotion/css';


const ItemDescriptionStyle = css({
  fontSize: '1.0em',
  fontStyle: 'italic',
  color: '#666666'
});

const ItemDescription: React.FunctionComponent = ({
  children
}) => {
  return (
    <span
      className={ItemDescriptionStyle}
    >
      {children}
    </span>
  );
};

const ItemNameStyle = css({
  fontSize: '1.2em',
  fontWeight: 300,
  color: '#2e2e2e'
});

const ItemName: React.FunctionComponent = ({
  children
}) => {
  return (
    <span
      className={ItemNameStyle}
    >
      {children}
    </span>
  );
};

const ListDescriptionStyle = css({
  display: 'flex',
  flexDirection: 'column'
});

const ListDescription: React.FunctionComponent = ({
  children
}) => {
  return (
    <div
      className={ListDescriptionStyle}
    >
      {children}
    </div>
  );
};

export {ItemDescription, ItemName, ListDescription};
