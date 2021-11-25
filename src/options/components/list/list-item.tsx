import React from 'react';

import {css, cx} from '@emotion/css';


type ListItemProps = {
  active?: boolean;
  onClick: ((e: React.SyntheticEvent) => void);
}

const ListItemStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#f0f0f0',
  padding: '10px',
  cursor: 'pointer',
});

const ActiveListItemStyle = css({
  backgroundColor: '#e6e6e6'
});

const ListItem: React.FunctionComponent<ListItemProps> = ({
  active,
  children,
  ...props
}) => {
  const styles = cx({
    [ListItemStyle]: true,
    [ActiveListItemStyle]: active
  });

  return (
    <div
      className={styles}
      {...props}
    >
      {children}
    </div>
  );
};

export default ListItem;
