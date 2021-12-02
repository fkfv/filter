import React from 'react';

import {useState} from 'react';
import {css} from '@emotion/css';

import Scroller from '../scroller';
import Button from '../controls/button';
import Input from '../controls/input';
import Group from '../controls/group';

import {useAppSelector, useAppDispatch} from '../../redux/hooks';
import {selectModule, selectBlockable, selectBlocked, addBlocked,
  removeBlocked} from '../../reducers/blocked';
import {TabPanel} from '../tabs';


const InstructionStyle = css({
  padding: '10px',
  flexBasis: '65%',

  '& > h2': {
    fontWeight: 300
  }
});

const Instruction = ({
  children
}: React.PropsWithChildren<{}>) => {
  return (
    <div
      className={InstructionStyle}
    >
      <h2>{children}</h2>
    </div>
  );
};

const Blocked = () => {
  const activeModule = useAppSelector(selectModule);
  const activeBlocker = useAppSelector(selectBlockable);
  const blockedItems = useAppSelector(selectBlocked);
  const dispatch = useAppDispatch();
  const [newBlock, setNewBlock] = useState('');

  if (!activeModule) {
    return (
      <Instruction>Select a module to view blockable items.</Instruction>
    );
  }

  if (!activeBlocker) {
    return (
      <Instruction>Select a blockable to view blocked items.</Instruction>
    );
  }

  return (
    <TabPanel>
      <Scroller>
        {blockedItems.map(blocked => {
          return (
            <Scroller.Item
              key={blocked}
            >
              <span>{blocked}</span>
              <Button
                color="green"
                onClick={() => {
                  dispatch(removeBlocked(blocked));
                }}
              >&times;</Button>
            </Scroller.Item>
          );
        })}
      </Scroller>
      <Group>
        <Input
          onChange={(e) => setNewBlock(e.target.value)}
          value={newBlock}
          label={`Add Blocked ${activeBlocker.name.plural}`}
        />
        <Button
          color="green"
          onClick={() => {
            dispatch(addBlocked(newBlock));
            setNewBlock('');
          }}
        >Add</Button>
      </Group>
    </TabPanel>
  );
};

export default Blocked;
