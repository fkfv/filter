import React from 'react';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {setSelectedBlockable, listBlocked, selectBlockables,
  selectBlockable} from '../../reducers/blocked';
import {TabList, Tab} from '../tabs';


const BlockerTabs = () => {
  const blockables = useAppSelector(selectBlockables);
  const activeBlockable = useAppSelector(selectBlockable);
  const dispatch = useAppDispatch();

  return (
    <TabList>
      {blockables.map(blockable => {
        const isActive = activeBlockable && activeBlockable.id === blockable.id;

        return (
          <Tab
            active={!!isActive}
            onClick={() => {
              dispatch(setSelectedBlockable(blockable));
              dispatch(listBlocked());
            }}
            key={blockable.id}
          >
            {blockable.name.singular}
          </Tab>
        );
      })}
    </TabList>
  );
};

export default BlockerTabs;
