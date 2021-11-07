import React from 'react';

import {css, cx} from '@emotion/css';


const ButtonGroupStyle = css({
  '& > *': {
    marginLeft: '5px'
  }
});

const ButtonGroup = ({
  children
}: React.PropsWithChildren<{}>) => {
  return (
    <div
      className={ButtonGroupStyle}
    >
      {children}
    </div>
  );
};

type StatusProps = {
  type: "error"|"warning"|"waiting";
  visible?: boolean;
};

const StatusStyle = css({
  display: 'none',
  fontWeight: 300
});

const ErrorStatusStyle = css({
  color: '#ff0000'
});

const WarningStatusStyle = css({
  color: '#ffa500'
});

const WaitingStatusStyle = css({
  color: 'rgba(0, 0, 0, 0.7)'
});

const VisibleStatusStyle = css({
  display: 'block'
});

const Status = ({
  type,
  visible,
  children
}: React.PropsWithChildren<StatusProps>) => {
  const styles = cx({
    [StatusStyle]: true,
    [ErrorStatusStyle]: type === 'error',
    [WarningStatusStyle]: type === 'warning',
    [WaitingStatusStyle]: type === 'waiting',
    [VisibleStatusStyle]: visible
  });

  return (
    <span
      className={styles}
    >
      {children}
    </span>
  );
};

const DialogFooterStyle = css({
  borderTop: '1px solid #cccccc',
  borderBottom: '1px solid #eeeeee',
  borderBottomLeftRadius: '2px',
  borderBottomRightRadius: '2px',
  backgroundColor: '#eeeeee',
  padding: '5px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  '& > span': {
    paddingLeft: '5px'
  }
});

const DialogFooter = ({
  children
}: React.PropsWithChildren<{}>) => {
  return (
    <div
      className={DialogFooterStyle}
    >
      {children}
    </div>
  );
};

DialogFooter.ButtonGroup = ButtonGroup;
DialogFooter.Status = Status;

export default DialogFooter;
export {ButtonGroup, Status};
