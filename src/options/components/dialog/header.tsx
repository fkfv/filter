import React from 'react';

import {css} from '@emotion/css';

import Button from '../controls/button';


const TitleStyle = css({
  fontSize: '1.5em',
  fontWeight: 300,
  paddingLeft: '5px'
});

const Title = ({
  children
}: React.PropsWithChildren<{}>) => {
  return (
    <span
      className={TitleStyle}
    >
      {children}
    </span>
  );
};

const CloseButton = ({
  ...props
}) => {
  return (
    <Button
      color="red"
      position="close"
      {...props}
    >
      &times;
    </Button>
  );
};

const DialogHeaderStyle = css({
  borderBottom: '1px solid #cccccc',
  borderTop: '1px solid #eeeeee',
  borderTopLeftRadius: '2px',
  borderTopRightRadius: '2px',
  backgroundColor: '#eeeeee',
  padding: '5px',
  display: 'flex',
  justifyContent: 'space-between'
});

const DialogHeader = ({
  children
}: React.PropsWithChildren<{}>) => {
  return (
    <div
      className={DialogHeaderStyle}
    >
      {children}
    </div>
  );
};

DialogHeader.Title = Title;
DialogHeader.CloseButton = CloseButton;

export default DialogHeader;
export {Title, CloseButton};
