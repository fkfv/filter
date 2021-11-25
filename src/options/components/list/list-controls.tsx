import React from 'react';

import {css, cx} from '@emotion/css';


type ListControlsProps = {
  visible?: boolean;
}

const ListControlsStyle = css({
  display: 'none'
});

const VisibleListControlsStyle = css({
  display: 'flex',
  alignItems: 'center'
})

const ListControls: React.FunctionComponent<ListControlsProps> = ({
  visible,
  children
}) => {
  const styles = cx({
    [ListControlsStyle]: true,
    [VisibleListControlsStyle]: visible
  });

  return (
    <div
      className={styles}
    >
      {children}
    </div>
  );
};

export default ListControls;
