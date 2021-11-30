import React from 'react';

import {css} from '@emotion/css';

import Button from '../controls/button';

import {Dialog, DialogHeader, DialogBody, DialogFooter} from '../dialog';
import {useAppSelector, useAppDispatch} from '../../redux/hooks';
import {selectConfirmRemove, setConfirmRemove,
  removeModule} from '../../reducers/modules';


const MessageStyle = css({
  fontWeight: 300,
  padding: '20px'
});

const RemoveDialog = () => {
  const moduleToRemove = useAppSelector(selectConfirmRemove);
  const visible = typeof moduleToRemove !== 'undefined';
  const dispatch = useAppDispatch();
  const closeDialog = () => dispatch(setConfirmRemove(undefined));

  return (
    <Dialog visible={visible}>
      <DialogHeader>
        <DialogHeader.Title>Confirm Removal</DialogHeader.Title>
        <DialogHeader.CloseButton onClick={closeDialog}/>
      </DialogHeader>
      <DialogBody>
        <h2
          className={MessageStyle}
        >
          Are you sure you wish to remove the module {moduleToRemove}?
        </h2>
      </DialogBody>
      <DialogFooter>
        <DialogFooter.ButtonGroup>
          <Button
            color="red"
            onClick={() => {
              // @ts-ignore
              dispatch(removeModule(moduleToRemove)).then(closeDialog);
            }}
          >
            Remove
          </Button>
          <Button color="green" onClick={closeDialog}>
            Keep
          </Button>
        </DialogFooter.ButtonGroup>
      </DialogFooter>
    </Dialog>
  );
};

export default RemoveDialog;
