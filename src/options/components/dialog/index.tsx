import React from 'react';

import {css} from '@emotion/css';

import DialogHeader from './header';
import DialogBody from './body';
import DialogFooter from './footer';


type DialogProps = {
  visible?: boolean;
};

const DialogStyle = css({
  display: 'block',
  position: 'fixed',
  zIndex: 1,
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.2)'
});

const ContentDialogStyle = css({
  margin: '15% auto',
  width: '30%',
  display: 'flex',
  flexDirection: 'column'
});

const Dialog = ({
  visible,
  children
}: React.PropsWithChildren<DialogProps>) => {
  if (visible) {
    return (
      <div
        className={DialogStyle}
      >
        <div
          className={ContentDialogStyle}
        >
          {children}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

Dialog.DialogHeader = DialogHeader;
Dialog.DialogBody = DialogBody;
Dialog.DialogFooter = DialogFooter;

export default Dialog;
export {Dialog, DialogHeader, DialogBody, DialogFooter};
